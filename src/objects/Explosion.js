export default class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    this.setScale(2.5);
    this.play('explode');
  }
}
