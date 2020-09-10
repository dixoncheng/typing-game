import Phaser from 'phaser';
import skyImg from '../assets/sky.png';
import StartButton from '../objects/StartButton';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('sky', skyImg);
  }

  create() {
    const { gameWidth, gameHeight } = this.game.config;

    // bg
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setScale(2);

    // logo
    this.add.text(160, 100, 'LOGO', { fill: '#000' });

    // start button
    this.startButton = new StartButton(this, 160, 550, 'Start', {
      fill: '#000'
    });
    this.add.existing(this.startButton);
    this.startButton.on('pointerdown', () => this.startGame());
  }

  startGame() {
    this.scene.start('game');
  }
}
