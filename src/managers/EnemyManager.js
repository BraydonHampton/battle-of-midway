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
        
        // Update all enemies
        this.enemyInstances.forEach((enemy, index) => {
            enemy.update();
            // Remove destroyed enemies from array
            if (!enemy.sprite || !enemy.sprite.active) {
                this.enemyInstances.splice(index, 1);
            }
        });
    }
    
    spawnEnemy() {
        const x = Phaser.Math.Between(this.spawnMinX, this.spawnMaxX);
        const y = this.spawnY;
        const type = Phaser.Utils.Array.GetRandom(this.aircraftTypes);
        
        console.log('EnemyManager: Spawning enemy:', type, 'at', x, y);
        
        const enemy = new Enemy(this.scene, x, y, type);
        this.enemies.add(enemy.sprite);
        this.enemyInstances.push(enemy);
        
        console.log('EnemyManager: Enemy created, total enemies:', this.enemyInstances.length);
    }
    
    getEnemyGroup() {
        return this.enemies;
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