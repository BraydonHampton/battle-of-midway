import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        // Receive final score from GameScene
        this.finalScore = data.score || 0;
    }

    create() {
        const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Dark background
        this.cameras.main.setBackgroundColor('#1a1a1a');

        // Game Over title
        this.add.text(centerX, centerY - 120, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ff4444',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Final score
        this.add.text(centerX, centerY - 40, `Final Score: ${this.finalScore}`, {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Play again button
        const playAgainButton = this.add.text(centerX, centerY + 40, 'PRESS SPACE TO PLAY AGAIN', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#00ff00',
            stroke: '#004400',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Menu button
        const menuButton = this.add.text(centerX, centerY + 100, 'PRESS ESC FOR MAIN MENU', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#cccccc',
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0.5);

        // Make buttons flash
        this.tweens.add({
            targets: playAgainButton,
            alpha: 0.5,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: menuButton,
            alpha: 0.7,
            duration: 1200,
            yoyo: true,
            repeat: -1
        });

        // Input handling
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Show some game stats or encouragement
        const encouragementTexts = [
            'Better luck next time!',
            'The enemy was strong today!',
            'Victory will be yours!',
            'Keep fighting pilot!',
            'The battle continues!'
        ];
        
        const encouragement = Phaser.Utils.Array.GetRandom(encouragementTexts);
        this.add.text(centerX, centerY + 160, encouragement, {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#888888',
            style: 'italic'
        }).setOrigin(0.5);
    }

    update() {
        // Restart game
        if (this.spaceKey.isDown) {
            this.scene.start('GameScene');
        }
        
        // Return to main menu
        if (this.escKey.isDown) {
            this.scene.start('MenuScene');
        }
    }
}