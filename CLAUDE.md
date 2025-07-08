# 1943: Battle of Midway Clone

## Project Overview
Building a JavaScript clone of the classic arcade game "1943: The Battle of Midway" using Phaser.js. This is a learning project focused on understanding game development concepts and practicing effective AI collaboration.

## Learning Goals
- Master Phaser.js game engine fundamentals
- Implement classic arcade game mechanics (shooting, collision, enemy AI)
- Practice incremental development and debugging
- Learn effective AI prompting for technical projects

Research → Plan → Implement → Explain
NEVER JUMP STRAIGHT TO CODING! Always follow this sequence:

Research: Explore the codebase, understand existing patterns
Plan: Create a detailed implementation plan and verify it with me
Implement: Execute the plan with validation checkpoints
When asked to implement any feature, you'll first say: "Let me research the codebase and create a plan before implementing."

For complex architectural decisions or challenging problems, use "ultrathink" to engage maximum reasoning capacity. Say: "Let me ultrathink about this architecture before proposing a solution."

USE MULTIPLE AGENTS!
Leverage subagents aggressively for better results:

Spawn agents to explore different parts of the codebase in parallel
Use one agent to write tests while another implements features
Delegate research tasks: "I'll have an agent investigate the database schema while I analyze the API structure"
For complex refactors: One agent identifies changes, another implements them
Say: "I'll spawn agents to tackle different aspects of this problem" whenever a task has multiple independent parts.

Reality Checkpoints
Stop and validate at these moments:

After implementing a complete feature
Before starting a new major component
When something feels wrong
Before declaring "done"

Working Memory Management
When context gets long:
Re-read this CLAUDE.md file
Summarize progress in a PROGRESS.md file
Document current state before major changes
Maintain TODO.md:
## Current Task
- [ ] What we're doing RIGHT NOW

## Completed  
- [x] What's actually done and tested

## Next Steps
- [ ] What comes next

## Technical Stack
- **Engine**: Phaser.js (latest stable version)
- **Language**: JavaScript (ES6+)
- **Build Tool**: Vite (for development server and bundling)
- **Assets**: Sprite sheets, sound effects, background music

## Game Features to Implement
### Core Mechanics
- Player-controlled aircraft with 8-directional movement
- Bullet shooting with different weapon types
- Enemy aircraft with various movement patterns
- Power-up system (weapon upgrades, health, points)
- Health/lives system
- Scoring system

### Enemy Types (implement incrementally)
1. Basic fighters (straight-line movement)
2. Dive bombers (swooping patterns)
3. Formation flyers (group movement)
4. Boss aircraft (complex patterns, multiple hits)

### Game States
- Main menu
- Gameplay
- Game over
- Pause functionality

## Development Approach
### Phase 1: Foundation
- Basic Phaser scene setup
- Player ship movement and boundaries
- Simple bullet shooting

### Phase 2: Combat
- Enemy spawning system
- Collision detection
- Basic enemy AI patterns

### Phase 3: Enhancement
- Power-ups and weapon systems
- Sound effects and music
- Visual effects (explosions, particles)

### Phase 4: Polish
- UI improvements
- Game balance
- Performance optimization

## AI Collaboration Guidelines
### Preferred Prompting Style
- Request explanations alongside code implementations
- Ask for step-by-step breakdowns of complex concepts
- Seek comparisons between different approaches
- Request debugging guidance when issues arise

### Code Quality Expectations
- Clean, commented code with meaningful variable names
- Modular architecture (separate classes for different game entities)
- Consistent coding style
- Error handling for common edge cases

## Project Structure
```
/src
  /scenes
    - MenuScene.js
    - GameScene.js
    - GameOverScene.js
  /entities
    - Player.js
    - Enemy.js
    - Bullet.js
    - PowerUp.js
  /managers
    - EnemyManager.js
    - SoundManager.js
  /utils
    - Constants.js
    - Utils.js
  - main.js
/assets
  /sprites
  /sounds
  /music
- index.html
- package.json
- vite.config.js
```

## Notes
- Prioritize learning and understanding over speed
- Ask for explanations when code concepts aren't clear
- Build incrementally - get each feature working before moving to next
- Test frequently during development

Communication Protocol
Progress Updates:
✓ Implemented authentication (all tests passing)
✓ Added rate limiting  
✗ Found issue with token expiration - investigating
Suggesting Improvements:
"The current approach works, but I notice [observation]. Would you like me to [specific improvement]?"

Working Together
This is always a feature branch - no backwards compatibility needed
When in doubt, we choose clarity over cleverness
REMINDER: If this file hasn't been referenced in 30+ minutes, RE-READ IT!
Avoid complex abstractions or "clever" code. The simple, obvious solution is probably better, and my guidance helps you stay focused on what matters.