import Enemy from '../entities/Enemy.js';

export default class EnemyManager {
    constructor(scene) {
        this.scene = scene;
        this.enemies = scene.physics.add.group();
        this.enemyInstances = [];
        
        // Spawning configuration
        this.spawnTimer = 0;
        this.spawnDelay = 2000;
        this.aircraftTypes = ['Aircraft_01', 'Aircraft_02', 'Aircraft_03'];
        this.flightPatterns = ['straight', 'zigzag', 'diagonal', 'swooping'];
        
        // Enemy bullets
        this.enemyBullets = scene.physics.add.group();
        
        // Spawn boundaries
        this.spawnMinX = 50;
        this.spawnMaxX = 750;
        this.spawnY = 0;
    }
    
    update(time, delta) {
        // Handle enemy spawning
        if (time > this.spawnTimer) {
            this.spawnEnemy();
            this.spawnTimer = time + this.spawnDelay;
        }
        
        // Update all enemies - iterate backwards to avoid index shifting
        for (let i = this.enemyInstances.length - 1; i >= 0; i--) {
            const enemy = this.enemyInstances[i];
            enemy.update(time);
            
            // Collect enemy bullets into the group for collision detection
            enemy.getBullets().forEach(bullet => {
                if (bullet && bullet.sprite && bullet.sprite.active && !this.enemyBullets.contains(bullet.sprite)) {
                    this.enemyBullets.add(bullet.sprite);
                }
            });
            
            // Remove destroyed enemies from array
            if (!enemy.sprite || !enemy.sprite.active) {
                this.enemyInstances.splice(i, 1);
            }
        }
        
        // Clean up orphaned enemy bullets that are off-screen
        const bulletsToRemove = [];
        this.enemyBullets.children.entries.forEach(bulletSprite => {
            if (bulletSprite.bulletInstance) {
                bulletSprite.bulletInstance.update();
                // Mark for removal if destroyed
                if (!bulletSprite.active) {
                    bulletsToRemove.push(bulletSprite);
                }
            }
        });
        
        // Remove marked bullets (separate loop to avoid modification during iteration)
        bulletsToRemove.forEach(bulletSprite => {
            this.enemyBullets.remove(bulletSprite);
        });
    }
    
    spawnEnemy() {
        const x = Phaser.Math.Between(this.spawnMinX, this.spawnMaxX);
        const y = this.spawnY;
        const type = Phaser.Utils.Array.GetRandom(this.aircraftTypes);
        const pattern = Phaser.Utils.Array.GetRandom(this.flightPatterns);
        
        console.log('EnemyManager: Spawning enemy:', type, 'with pattern:', pattern, 'at', x, y);
        
        const enemy = new Enemy(this.scene, x, y, type, pattern);
        this.enemies.add(enemy.sprite);
        this.enemyInstances.push(enemy);
        
        console.log('EnemyManager: Enemy created, total enemies:', this.enemyInstances.length);
    }
    
    getEnemyGroup() {
        return this.enemies;
    }
    
    getEnemyBullets() {
        return this.enemyBullets;
    }
    
    getEnemyCount() {
        return this.enemyInstances.length;
    }
    
    destroyEnemy(enemySprite) {
        const enemy = enemySprite.enemyInstance;
        if (enemy) {
            const points = enemy.takeDamage(1);
            // Remove from our tracking array
            const index = this.enemyInstances.indexOf(enemy);
            if (index > -1) {
                this.enemyInstances.splice(index, 1);
            }
            return points;
        }
        return 0;
    }
    
    // Configuration methods
    setSpawnRate(milliseconds) {
        this.spawnDelay = milliseconds;
    }
    
    setSpawnBounds(minX, maxX, y) {
        this.spawnMinX = minX;
        this.spawnMaxX = maxX;
        this.spawnY = y;
    }
    
    addAircraftType(type) {
        if (!this.aircraftTypes.includes(type)) {
            this.aircraftTypes.push(type);
        }
    }
}