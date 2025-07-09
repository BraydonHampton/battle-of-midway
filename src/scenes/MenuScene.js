import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Create simple colored rectangles as placeholder sprites
        this.load.image('title-bg', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==');
    }

    create() {
        const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Game title
        this.add.text(centerX, centerY - 100, '1943: Battle of Midway', {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, centerY - 50, 'JavaScript Clone', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#cccccc'
        }).setOrigin(0.5);

        // Start button
        const startButton = this.add.text(centerX, centerY + 50, 'PRESS SPACE TO START', {
            fontFamily: 'Arial',
            fontSize: 28,
            color: '#00ff00',
            stroke: '#004400',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Make the start button flash
        this.tweens.add({
            targets: startButton,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Instructions
        this.add.text(centerX, centerY + 120, 'Use arrow keys to move, SPACE to shoot', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#888888'
        }).setOrigin(0.5);

        // Input handling
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('GameScene');
        }
    }
}