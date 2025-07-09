# 1943: Battle of Midway Clone

A JavaScript clone of the classic arcade game "1943: The Battle of Midway" built with Phaser.js. This is a learning project focused on understanding game development concepts and practicing effective AI collaboration.

## 🎮 Game Features

### Core Gameplay
- **Player Control**: 8-directional movement with arrow keys
- **Combat System**: Shoot bullets with spacebar, automatic firing rate
- **Enemy AI**: Multiple aircraft types with downward movement patterns
- **Life System**: 3 lives with visual display, invincibility frames after damage
- **Scoring**: Points awarded for destroying enemy aircraft
- **Game Over**: Final score display with restart options

### Current Implementation
- ✅ **Menu System**: Animated title screen with start functionality
- ✅ **Player Ship**: Aircraft_06 sprite with full movement control
- ✅ **Enemy Aircraft**: 3 different aircraft types (Aircraft_01, 02, 03)
- ✅ **Collision Detection**: Bullets vs enemies, player vs enemies
- ✅ **Life Management**: Visual life counter, damage system
- ✅ **Scene Management**: Menu → Game → Game Over flow

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Game
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Controls

- **Arrow Keys**: Move player aircraft
- **Spacebar**: Shoot bullets
- **ESC**: Return to menu (from game) or exit (from menu)
- **Spacebar**: Start game (from menu) or restart (from game over)

## 🏗️ Architecture

### Manager Pattern
The game uses a manager pattern for clean code organization:

- **PlayerManager**: Handles player movement, shooting, lives, and collision
- **EnemyManager**: Manages enemy spawning, movement, and cleanup
- **CollisionManager**: Centralized collision detection system
- **ScoreManager**: Score tracking and UI updates

### Scene Structure
- **MenuScene**: Title screen and game start
- **GameScene**: Main gameplay orchestration
- **GameOverScene**: Final score and restart options

### Project Structure
```
/src
  /entities
    - Enemy.js          # Enemy aircraft class
  /managers
    - PlayerManager.js  # Player control and life system
    - EnemyManager.js   # Enemy spawning and management
    - CollisionManager.js # Collision detection
    - ScoreManager.js   # Score and UI management
  /scenes
    - MenuScene.js      # Title screen
    - GameScene.js      # Main game loop
    - GameOverScene.js  # Game over screen
  - main.js             # Phaser configuration
/assets
  /sprites
    /aircrafts          # Player and enemy sprites
    /bullets            # Bullet and projectile sprites
- index.html
- package.json
- vite.config.js
```

## 🎨 Assets

### Current Sprites
- **Player Aircraft**: Aircraft_06 (green tinted)
- **Enemy Aircraft**: Aircraft_01, Aircraft_02, Aircraft_03 (rotated 180°)
- **Bullets**: Orange bullet sprites with animation frames
- **Background**: Tiled water texture
- **UI Elements**: Text-based interface

### Available Assets
The project includes additional unused sprites for future expansion:
- 10 different aircraft types with hit/shadow variants
- Multiple bullet colors (blue, orange, purple) with animation frames
- Rotor animation frames for helicopters
- Rocket projectiles

### Art Credits
- Aircraft and bullet sprites: [Chabull](https://opengameart.org/users/chabull) via OpenGameArt.org
- Water texture: [www.GodsAndIdols.com](https://www.GodsAndIdols.com)

## 🔄 Development Phases

### ✅ Phase 1: Foundation (Complete)
- Basic Phaser scene setup
- Player movement and boundaries
- Simple bullet shooting

### ✅ Phase 2: Combat (Complete)
- Enemy spawning system
- Collision detection
- Basic enemy AI patterns
- Life and scoring systems

### 🔄 Phase 3: Enhancement (In Progress)
- [x] Tiled water background texture
- [ ] Power-up system (weapon upgrades, health, points)
- [ ] Sound effects and music
- [ ] Visual effects (explosions, particles)
- [ ] Multiple enemy movement patterns

### ⏳ Phase 4: Polish (Planned)
- [ ] UI improvements
- [ ] Game balance and difficulty scaling
- [ ] Performance optimization
- [ ] Mobile responsiveness

## 🐛 Known Issues

### Current Bugs
- **Shooting Crashes**: Game may crash when shooting bullets - investigating collision detection issues

## 🧠 Learning Goals

This project demonstrates:
- **Phaser.js fundamentals**: Scene management, physics, sprites
- **Game architecture**: Manager pattern, separation of concerns
- **Collision systems**: Physics-based detection and response
- **State management**: Lives, scoring, game flow
- **Asset management**: Sprite loading and organization
- **AI collaboration**: Structured development with AI assistance

## 🛠️ Technical Stack

- **Game Engine**: Phaser.js 3.80.0
- **Build Tool**: Vite 5.0.0
- **Language**: JavaScript (ES6+)
- **Physics**: Arcade Physics (2D)
- **Asset Format**: PNG sprites

## 📝 Development Notes

### Manager Pattern Benefits
- **Separation of Concerns**: Each manager handles one aspect of gameplay
- **Maintainability**: Easy to modify individual systems
- **Testability**: Managers can be tested independently
- **Scalability**: Simple to add new features without bloating scenes

### Code Quality
- Clean, commented code with meaningful variable names
- Modular architecture with reusable components
- Consistent coding style throughout
- Error handling for common edge cases


---

*Built with ❤️ as a learning project exploring game development and AI-assisted programming.*