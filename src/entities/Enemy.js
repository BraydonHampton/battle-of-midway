import EnemyBullet from './EnemyBullet.js';

export default class Enemy {
    constructor(scene, x, y, type = 'Aircraft_01', pattern = 'straight') {
        console.log('Enemy constructor called with:', type, x, y, pattern);
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, type);
        this.sprite.setDisplaySize(96, 96);
        this.sprite.setCollideWorldBounds(false);
        this.sprite.setRotation(Math.PI); // Rotate 180 degrees to face downward
        
        // Enemy properties
        this.speed = 150;
        this.health = 1;
        this.points = 100;
        this.type = type;
        this.pattern = pattern;
        
        // Shooting properties
        this.canShoot = true;
        this.fireRate = 2000; // Time between shots in milliseconds
        this.lastShotTime = 0;
        this.bullets = [];
        
        // Movement pattern properties
        this.patternStartTime = this.scene.time.now;
        this.zigzagDirection = 1; // For zigzag pattern
        this.originalX = x;
        
        // Reference back to this enemy instance
        this.sprite.enemyInstance = this;
        
        console.log('Enemy sprite created:', this.sprite);
        
        // Set initial movement (moving down) - use nextTick to ensure physics body is ready
        this.scene.time.delayedCall(10, () => {
            // Safety check - only set velocity if sprite still exists
            if (this.sprite && this.sprite.active && this.sprite.body) {
                this.sprite.setVelocityY(this.speed);
                console.log('Enemy velocity set to:', this.sprite.body.velocity);
            }
        });
    }
    
    update(time) {
        // Handle movement patterns
        this.updateMovementPattern(time);
        
        // Handle shooting
        this.updateShooting(time);
        
        // Update bullets
        this.updateBullets();
        
        // Destroy when off screen
        if (this.sprite.y > this.scene.cameras.main.height + 50) {
            this.destroy();
        }
    }
    
    updateMovementPattern(time) {
        const elapsedTime = time - this.patternStartTime;
        
        switch (this.pattern) {
            case 'straight':
                // Keep current downward movement
                break;
                
            case 'zigzag':
                // Zigzag left and right while moving down
                const zigzagSpeed = 100;
                const zigzagFreq = 1000; // Change direction every 1 second
                
                if (elapsedTime % zigzagFreq < 500) {
                    this.sprite.setVelocityX(zigzagSpeed * this.zigzagDirection);
                } else {
                    this.sprite.setVelocityX(-zigzagSpeed * this.zigzagDirection);
                }
                break;
                
            case 'diagonal':
                // Move diagonally down and right/left
                const diagonalSpeed = 80;
                this.sprite.setVelocityX(diagonalSpeed * this.zigzagDirection);
                break;
                
            case 'swooping':
                // Sine wave pattern
                const amplitude = 150;
                const frequency = 0.003;
                const targetX = this.originalX + Math.sin(elapsedTime * frequency) * amplitude;
                this.sprite.x = targetX;
                break;
        }
    }
    
    updateShooting(time) {
        if (this.canShoot && time > this.lastShotTime + this.fireRate) {
            // Only shoot if player is somewhat below the enemy (in shooting range)
            if (this.sprite.y < this.scene.cameras.main.height - 100) {
                this.shoot();
                this.lastShotTime = time;
            }
        }
    }
    
    shoot() {
        const bullet = new EnemyBullet(this.scene, this.sprite.x, this.sprite.y + 20, 300);
        this.bullets.push(bullet);
    }
    
    updateBullets() {
        // Update and clean up bullets - iterate backwards to avoid index shifting
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update();
            if (!bullet.sprite || !bullet.sprite.active) {
                this.bullets.splice(i, 1);
            }
        }
    }
    
    getBullets() {
        return this.bullets;
    }
    
    takeDamage(damage = 1) {
        this.health -= damage;
        if (this.health <= 0) {
            this.destroy();
            return this.points;
        }
        return 0;
    }
    
    destroy() {
        // Don't destroy bullets - they should continue flying!
        // Just clear our reference to them since we're destroyed
        this.bullets = [];
        
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}