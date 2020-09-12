import Phaser from 'phaser';
import menu from './scenes/menu';
import game from './scenes/game';
import gameover from './scenes/gameover';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
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
