export default class PlayerManager {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
        this.bullets = null;
        
        // Player stats
        this.lives = 3;
        this.maxLives = 3;
        this.lifeSprites = [];
        
        // Movement
        this.speed = 300;
        this.cursors = null;
        
        // Shooting
        this.spaceKey = null;
        this.shootCooldown = 0;
        this.shootDelay = 200;
        
        // Callbacks
        this.onLifeLost = null;
        this.onGameOver = null;
        
        // Invincibility frames after taking damage
        this.invincible = false;
        this.invincibilityDuration = 2000;
    }
    
    // Initialize player sprite and controls
    create() {
        // Create player sprite
        this.player = this.scene.physics.add.sprite(400, 500, 'player');
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0x00ff00);
        this.player.setCollideWorldBounds(true);
        
        // Create bullets group
        this.bullets = this.scene.physics.add.group();
        
        // Set up input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Create life display
        this.createLifeDisplay();
        
        return this.player;
    }
    
    // Create visual life display
    createLifeDisplay(x = 16, y = 560) {
        this.lifeSprites = [];
        
        for (let i = 0; i < this.lives; i++) {
            const lifeSprite = this.scene.add.sprite(x + (i * 40), y, 'player');
            lifeSprite.setDisplaySize(24, 24);
            lifeSprite.setTint(0x00ff00);
            this.lifeSprites.push(lifeSprite);
        }
        
        return this.lifeSprites;
    }
    
    // Update player (called from GameScene update)
    update(time, delta) {
        if (!this.player) return;
        
        // Handle movement
        this.handleMovement();
        
        // Handle shooting
        this.handleShooting(time);
        
        // Clean up bullets
        this.cleanupBullets();
        
        // Handle invincibility timer
        if (this.invincible && time > this.invincibilityTimer) {
            this.invincible = false;
            this.player.setTint(0x00ff00); // Reset to normal color
        }
    }
    
    // Handle player movement
    handleMovement() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.speed);
        } else {
            this.player.setVelocityY(0);
        }
    }
    
    // Handle player shooting
    handleShooting(time) {
        if (this.spaceKey.isDown && time > this.shootCooldown) {
            this.shootBullet();
            this.shootCooldown = time + this.shootDelay;
        }
    }
    
    // Shoot a bullet
    shootBullet() {
        if (!this.player || !this.bullets) return;
        
        const bullet = this.bullets.create(this.player.x, this.player.y - 20, 'bullet');
        bullet.setDisplaySize(4, 10);
        bullet.setTint(0xffff00);
        bullet.setVelocityY(-500);
    }
    
    // Clean up bullets that left the screen
    cleanupBullets() {
        if (!this.bullets) return;
        
        this.bullets.children.entries.forEach(bullet => {
            if (bullet.y < -10) {
                bullet.destroy();
            }
        });
    }
    
    // Player takes damage
    takeDamage() {
        if (this.invincible) return false;
        
        this.lives--;
        
        // Remove a life sprite
        if (this.lifeSprites.length > 0) {
            const lifeSprite = this.lifeSprites.pop();
            lifeSprite.destroy();
        }
        
        console.log('Player took damage! Lives remaining:', this.lives);
        
        // Start invincibility frames
        this.invincible = true;
        this.invincibilityTimer = this.scene.time.now + this.invincibilityDuration;
        this.player.setTint(0xff0000); // Red tint during invincibility
        
        // Trigger callbacks
        if (this.onLifeLost) {
            this.onLifeLost(this.lives);
        }
        
        if (this.lives <= 0) {
            console.log('Game Over!');
            if (this.onGameOver) {
                this.onGameOver();
            }
        }
        
        return true;
    }
    
    // Getters
    getPlayer() {
        return this.player;
    }
    
    getBullets() {
        return this.bullets;
    }
    
    getLives() {
        return this.lives;
    }
    
    isGameOver() {
        return this.lives <= 0;
    }
    
    isInvincible() {
        return this.invincible;
    }
    
    // Setters for callbacks
    setLifeLostCallback(callback) {
        this.onLifeLost = callback;
    }
    
    setGameOverCallback(callback) {
        this.onGameOver = callback;
    }
    
    // Add life (for power-ups)
    addLife() {
        if (this.lives < this.maxLives) {
            this.lives++;
            
            const x = 16 + ((this.lifeSprites.length) * 40);
            const y = 560;
            const lifeSprite = this.scene.add.sprite(x, y, 'player');
            lifeSprite.setDisplaySize(24, 24);
            lifeSprite.setTint(0x00ff00);
            this.lifeSprites.push(lifeSprite);
            
            console.log('Life gained! Lives:', this.lives);
        }
    }
    
    // Reset for new game
    reset() {
        this.lives = this.maxLives;
        this.invincible = false;
        
        // Clear existing life sprites
        this.lifeSprites.forEach(sprite => sprite.destroy());
        this.lifeSprites = [];
        
        // Recreate life display
        this.createLifeDisplay();
        
        // Reset player position and appearance
        if (this.player) {
            this.player.setPosition(400, 500);
            this.player.setTint(0x00ff00);
        }
    }
}