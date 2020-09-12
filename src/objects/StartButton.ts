export default class StartButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: any
  ) {
    super(scene, x, y, text, style);
    this.setInteractive({
      useHandCursor: true
    });
  }
}
