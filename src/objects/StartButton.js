export default class StartButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);
    this.setInteractive({
      useHandCursor: true
    });
  }
}
