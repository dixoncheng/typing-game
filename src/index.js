import Phaser from 'phaser';
import menu from './scenes/menu';
import game from './scenes/game';
import gameover from './scenes/gameover';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 375,
  height: 812,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      // debug: true
    }
  },
  scene: [
    // menu,
    game,
    gameover
  ]
};

new Phaser.Game(config);
