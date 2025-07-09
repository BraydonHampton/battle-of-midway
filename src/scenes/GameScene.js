import Phaser from 'phaser';
import Enemy from '../entities/Enemy.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Create simple colored rectangles as placeholder sprites
        this.load.image('player', 'assets/sprites/aircrafts/Aircraft_06.png');
        this.load.image('bullet', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==');
        
        // Load enemy aircraft sprites
        this.load.image('Aircraft_01', 'assets/sprites/aircrafts/Aircraft_01.png');
        this.load.image('Aircraft_02', 'assets/sprites/aircrafts/Aircraft_02.png');
        this.load.image('Aircraft_03', 'assets/sprites/aircrafts/Aircraft_03.png');
    }

    create() {
        // Ocean background color
        this.cameras.main.setBackgroundColor('#1e3a8a');

        // Create player sprite
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0x00ff00);
        this.player.setCollideWorldBounds(true);

        // Create bullets group
        this.bullets = this.physics.add.group();
        
        // Create enemies group and array
        this.enemies = this.physics.add.group();
        this.enemyInstances = [];

        // Input handling
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Shooting cooldown
        this.shootCooldown = 0;
        this.shootDelay = 200;
        
        // Enemy spawning
        this.enemySpawnTimer = 0;
        this.enemySpawnDelay = 2000;
        
        // Game state
        this.score = 0;

        // Game UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff'
        });

        this.add.text(16, 50, 'Press ESC to return to menu', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#cccccc'
        });
        
        // Collision detection
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
    }

    update(time, delta) {
        // Player movement
        const speed = 300;
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        } else {
            this.player.setVelocityY(0);
        }

        // Shooting
        if (this.spaceKey.isDown && time > this.shootCooldown) {
            this.shootBullet();
            this.shootCooldown = time + this.shootDelay;
        }

        // Enemy spawning
        if (time > this.enemySpawnTimer) {
            this.spawnEnemy();
            this.enemySpawnTimer = time + this.enemySpawnDelay;
        }
        
        // Update enemies
        this.enemyInstances.forEach((enemy, index) => {
            enemy.update();
            // Remove destroyed enemies from array
            if (!enemy.sprite || !enemy.sprite.active) {
                this.enemyInstances.splice(index, 1);
            }
        });
        
        // Clean up bullets that have left the screen
        this.bullets.children.entries.forEach(bullet => {
            if (bullet.y < -10) {
                bullet.destroy();
            }
        });

        // Return to menu
        if (this.escKey.isDown) {
            this.scene.start('MenuScene');
        }
    }

    shootBullet() {
        const bullet = this.bullets.create(this.player.x, this.player.y - 20, 'bullet');
        bullet.setDisplaySize(4, 10);
        bullet.setTint(0xffff00);
        bullet.setVelocityY(-500);
    }
    
    spawnEnemy() {
        const x = Phaser.Math.Between(50, 750);
        const y = 0;
        const aircraftTypes = ['Aircraft_01', 'Aircraft_02', 'Aircraft_03'];
        const type = Phaser.Utils.Array.GetRandom(aircraftTypes);
        
        console.log('Spawning enemy:', type, 'at', x, y);
        
        const enemy = new Enemy(this, x, y, type);
        this.enemies.add(enemy.sprite);
        this.enemyInstances.push(enemy);
        
        console.log('Enemy created, total enemies:', this.enemyInstances.length);
    }
    
    bulletHitEnemy(bullet, enemySprite) {
        const enemy = enemySprite.enemyInstance;
        if (enemy) {
            const points = enemy.takeDamage(1);
            if (points > 0) {
                this.score += points;
                this.scoreText.setText('Score: ' + this.score);
            }
        }
        bullet.destroy();
    }
}