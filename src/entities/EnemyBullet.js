export default class EnemyBullet {
    constructor(scene, x, y, speed = 300) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'bullet');
        
        // Visual setup - red bullets for enemies
        this.sprite.setDisplaySize(8, 20);
        this.sprite.setTint(0xff4444); // Red color for enemy bullets
        this.sprite.setRotation(Math.PI); // Rotate 180 degrees to point downward
        
        // Physics setup
        this.speed = speed;
        this.sprite.setCollideWorldBounds(false);
        
        // Set velocity with a small delay to ensure physics body is ready
        this.scene.time.delayedCall(10, () => {
            // Safety check - only set velocity if sprite still exists
            if (this.sprite && this.sprite.active && this.sprite.body) {
                this.sprite.setVelocityY(this.speed); // Move downward toward player
            }
        });
        
        // Reference back to this bullet instance
        this.sprite.bulletInstance = this;
        
        // Damage value
        this.damage = 1;
    }
    
    update() {
        // Safety check - don't update if sprite is destroyed
        if (!this.sprite || !this.sprite.active) {
            return;
        }
        
        // Destroy bullet when it goes off screen (below the game area)
        if (this.sprite.y > this.scene.cameras.main.height + 50) {
            this.destroy();
        }
    }
    
    getDamage() {
        return this.damage;
    }
    
    destroy() {
        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }
    }
}