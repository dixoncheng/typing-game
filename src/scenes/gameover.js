import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  init(data) {
    this.numCorrect = data.numCorrect;
    this.numAll = data.numAll;
  }

  create() {
    const { width, height } = this.game.config;

    this.add.existing(
      new Phaser.GameObjects.DynamicBitmapText(
        this,
        width / 2,
        height / 2,
        'carrier_command',
        // `Game over\n\nYou got ${this.numCorrect}/${this.numAll}!`,
        `Game over\n\nScore: ${this.numCorrect}`,
        14,
        1
      ).setOrigin(0.5, 0.5)
    );

    this.input.keyboard.on('keyup', this.keyPress, this);
    this.input.once('pointerdown', this.keyPress, this);
  }

  keyPress(event) {
    this.scene.start('game');
  }
}
