import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Create a simple colored rectangle as a placeholder sprite
        this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==');
    }

    create() {
        // Add a simple text to show the game is running
        const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        this.add.text(centerX, centerY - 50, '1943: Battle of Midway', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Basic Phaser Setup Complete!', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#00ff00'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 50, 'Press SPACE to continue', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#cccccc'
        }).setOrigin(0.5);

        // Add keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Simple input handling demonstration
        if (this.spaceKey.isDown) {
            console.log('Space key pressed - game is responsive!');
        }
    }
}