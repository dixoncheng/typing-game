export default class Monster extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture, name, velocity) {
    super(scene, x, y);
    this.name = name;

    const image = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    this.add([image]);
    scene.physics.world.enable(this);
    this.body.setVelocity(0, velocity);
  }
}
