export default class Monster extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture, name, velocity) {
    super(scene, x, y);
    this.name = name;
    this.correctCount = 0;

    // image
    const image = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    this.add([image]);

    // text
    const text = new Phaser.GameObjects.DynamicBitmapText(
      scene,
      0,
      38,
      'carrier_command',
      name,
      14
    )
      .setOrigin(0.5, 0)
      .setDisplayCallback((conf) => {
        // console.log(conf);
        if (conf.index < this.correctCount) {
          return {
            ...conf,
            color: 0x97d897
            // rotation: 0.1
            // scale: conf.scale * 1.1
          };
        }
        return { ...conf, color: 0xffffff };
      });
    this.add([text]);

    // movement
    scene.physics.world.enable(this);
    this.body.setVelocity(0, velocity);
  }
}
