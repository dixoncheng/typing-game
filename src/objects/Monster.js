export default class Monster extends Phaser.GameObjects.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.setTexture(key);
  }
}
