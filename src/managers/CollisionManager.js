export default class CollisionManager {
    constructor(scene) {
        this.scene = scene;
        this.collisionCallbacks = new Map();
    }
    
    // Set up collision detection between two groups
    setupCollision(group1, group2, callbackName, callback) {
        const overlap = this.scene.physics.add.overlap(group1, group2, callback, null, this.scene);
        this.collisionCallbacks.set(callbackName, overlap);
        return overlap;
    }
    
    // Handle bullet hitting enemy
    bulletHitEnemy(bullet, enemySprite, scoreManager, enemyManager) {
        const points = enemyManager.destroyEnemy(enemySprite);
        if (points > 0) {
            scoreManager.addScore(points);
        }
        bullet.destroy();
    }
    
    // Handle player hitting enemy (for future implementation)
    playerHitEnemy(player, enemySprite, gameScene) {
        // Future: handle player taking damage, lives system
        console.log('Player hit enemy!');
    }
    
    // Handle enemy hitting player bullet (same as bulletHitEnemy but from different perspective)
    enemyHitBullet(enemySprite, bullet, scoreManager, enemyManager) {
        this.bulletHitEnemy(bullet, enemySprite, scoreManager, enemyManager);
    }
    
    // Remove a collision detection
    removeCollision(callbackName) {
        const overlap = this.collisionCallbacks.get(callbackName);
        if (overlap) {
            overlap.destroy();
            this.collisionCallbacks.delete(callbackName);
        }
    }
    
    // Clean up all collision detections
    destroy() {
        this.collisionCallbacks.forEach((overlap) => {
            overlap.destroy();
        });
        this.collisionCallbacks.clear();
    }
}