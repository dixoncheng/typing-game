import Phaser from 'phaser';
import StartButton from '../objects/StartButton';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  preload() {}

  create() {
    const { width, height } = this.game.config;

    // restart button
    this.restartButton = new StartButton(this, 160, 550, 'Restart', {
      fill: '#000'
    });
    this.add.existing(this.restartButton);
    this.restartButton.on('pointerdown', () => this.startGame());
  }

  startGame() {
    this.scene.start('game');
  }
}
