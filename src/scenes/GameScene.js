import Phaser from 'phaser';
import PlayerManager from '../managers/PlayerManager.js';
import EnemyManager from '../managers/EnemyManager.js';
import CollisionManager from '../managers/CollisionManager.js';
import ScoreManager from '../managers/ScoreManager.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load sprites
        this.load.image('player', 'assets/sprites/aircrafts/Aircraft_06.png');
        this.load.image('bullet', 'assets/sprites/bullets/bullet_orange0001.png');
        this.load.image('water_tile', 'assets/sprites/environment/tex_Water.jpg');
        
        // Load enemy aircraft sprites
        this.load.image('Aircraft_01', 'assets/sprites/aircrafts/Aircraft_01.png');
        this.load.image('Aircraft_02', 'assets/sprites/aircrafts/Aircraft_02.png');
        this.load.image('Aircraft_03', 'assets/sprites/aircrafts/Aircraft_03.png');
    }

    create() {
        // Create tiled water background
        this.createWaterBackground();

        // Initialize player manager
        this.playerManager = new PlayerManager(this);
        this.playerManager.create();
        
        // Initialize other managers
        this.enemyManager = new EnemyManager(this);
        this.collisionManager = new CollisionManager(this);
        this.scoreManager = new ScoreManager(this);

        // ESC key for menu
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Game UI
        this.scoreManager.createScoreDisplay();

        this.add.text(16, 50, 'Press ESC to return to menu', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#cccccc'
        });
        
        // Set up collision detection
        this.collisionManager.setupCollision(
            this.playerManager.getBullets(), 
            this.enemyManager.getEnemyGroup(), 
            'bulletEnemy',
            (bullet, enemySprite) => {
                this.collisionManager.bulletHitEnemy(bullet, enemySprite, this.scoreManager, this.enemyManager);
            }
        );
        
        // Set up player-enemy collision
        this.collisionManager.setupCollision(
            this.playerManager.getPlayer(),
            this.enemyManager.getEnemyGroup(),
            'playerEnemy',
            (player, enemySprite) => {
                if (!this.playerManager.isInvincible()) {
                    this.playerManager.takeDamage();
                }
            }
        );
        
        // Set up player manager callbacks
        this.playerManager.setGameOverCallback(() => {
            this.scene.start('GameOverScene', { score: this.scoreManager.getScore() });
        });
    }

    update(time, delta) {
        // Update managers
        this.playerManager.update(time, delta);
        this.enemyManager.update(time, delta);

        // Return to menu
        if (this.escKey.isDown) {
            this.scene.start('MenuScene');
        }
    }

    createWaterBackground() {
        const tileDisplaySize = 128; // How big each tile appears
        const tileSpacing = 120; // Spacing between tiles (less than display size = overlap)
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        // Calculate how many tiles we need
        const tilesX = Math.ceil(gameWidth / tileSpacing) + 1;
        const tilesY = Math.ceil(gameHeight / tileSpacing) + 1;
        
        // Create a group to hold all water tiles
        this.waterTiles = this.add.group();
        
        // Create the tiled background with overlap, starting offscreen to cover edges
        for (let x = -1; x < tilesX; x++) {
            for (let y = -1; y < tilesY; y++) {
                const tile = this.add.image(x * tileSpacing, y * tileSpacing, 'water_tile');
                tile.setOrigin(0, 0); // Set origin to top-left for proper tiling
                tile.setDisplaySize(tileDisplaySize, tileDisplaySize);
                this.waterTiles.add(tile);
            }
        }
    }
    
}