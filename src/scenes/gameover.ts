import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  numCorrect: number;
  numAll: number;

  constructor() {
    super('gameover');
  }

  init(data: any) {
    this.numCorrect = data.numCorrect;
    this.numAll = data.numAll;
  }

  create() {
    const { width, height } = this.game.config;

    this.add.existing(
      new Phaser.GameObjects.DynamicBitmapText(
        this,
        Number(width) / 2,
        Number(height) / 2,
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

  keyPress(event: Phaser.Input.Keyboard.Key | Phaser.Input.Pointer) {
    this.scene.start('game');
  }
}
