export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.scoreText = null;
    }
    
    // Initialize the score display
    createScoreDisplay(x = 16, y = 16) {
        this.scoreText = this.scene.add.text(x, y, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff'
        });
        return this.scoreText;
    }
    
    // Add points to the score
    addScore(points) {
        this.score += points;
        this.updateDisplay();
    }
    
    // Update the score display
    updateDisplay() {
        if (this.scoreText) {
            this.scoreText.setText('Score: ' + this.score);
        }
    }
    
    // Get current score
    getScore() {
        return this.score;
    }
    
    // Reset score
    resetScore() {
        this.score = 0;
        this.updateDisplay();
    }
    
    // Set score directly (for loading saved games, etc.)
    setScore(score) {
        this.score = score;
        this.updateDisplay();
    }
}