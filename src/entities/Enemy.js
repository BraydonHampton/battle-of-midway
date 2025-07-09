export default class Enemy {
    constructor(scene, x, y, type = 'Aircraft_01') {
        console.log('Enemy constructor called with:', type, x, y);
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, type);
        this.sprite.setDisplaySize(48, 48);
        this.sprite.setCollideWorldBounds(false);
        this.sprite.setRotation(Math.PI); // Rotate 180 degrees to face downward
        
        // Enemy properties
        this.speed = 150;
        this.health = 1;
        this.points = 100;
        this.type = type;
        
        // Reference back to this enemy instance
        this.sprite.enemyInstance = this;
        
        console.log('Enemy sprite created:', this.sprite);
        
        // Set initial movement (moving down) - use nextTick to ensure physics body is ready
        this.scene.time.delayedCall(10, () => {
            this.sprite.setVelocityY(this.speed);
            console.log('Enemy velocity set to:', this.sprite.body.velocity);
        });
    }
    
    update() {
        // Simple AI: move down, destroy when off screen
        if (this.sprite.y > this.scene.cameras.main.height + 50) {
            this.destroy();
        }
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
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}