import Phaser from 'phaser';
import skyImg from '../assets/sky.png';
import Monster from '../objects/Monster';

import monsters from '../data/list.json';

const imagePath =
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/';
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('sky', skyImg);
    this.load.image('test', `${imagePath}1.png`);
  }

  create() {
    const { width, height } = this.game.config;
    // bg
    this.add.image(width / 2, height / 2, 'sky').setScale(2);

    this.monsters = this.physics.add.group({
      // key: 'monsters',
      // repeat: 11,
      // setXY: { x: 12, y: 0, stepX: 70 }
    });

    // this.add.image(width / 2, height / 2, 'test');

    // let monster = this.monsters.create(100, 100, 'test');
    this.add.existing(new Monster(this, 100, 100, 'test'));

    // monster.setCollideWorldBounds(true);
    // monster.setVelocity(0, Phaser.Math.Between(0, 100));

    // create monster class
    // appear
    // typing bubble appear

    //
  }

  update() {}
}
