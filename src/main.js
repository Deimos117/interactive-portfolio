import { BootScene } from './scenes/BootScene.js';
import { ExteriorScene } from './scenes/ExteriorScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    pixelArt: true, // Crucial for pixel art crispness
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        BootScene,
        ExteriorScene
    ]
};

const game = new Phaser.Game(config);
