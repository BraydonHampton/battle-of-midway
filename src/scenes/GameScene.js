import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Create simple colored rectangles as placeholder sprites
        this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==');
        this.load.image('bullet', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==');
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

        // Input handling
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Shooting cooldown
        this.shootCooldown = 0;
        this.shootDelay = 200;

        // Game UI
        this.add.text(16, 16, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff'
        });

        this.add.text(16, 50, 'Press ESC to return to menu', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#cccccc'
        });
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
}