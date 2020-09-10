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
    const { width: gameWidth, height: gameHeight } = this.game.config;

    // bg
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setScale(2);

    this.monsters = this.add.group();
    const monster = new Monster(
      this,
      100,
      100,
      'test',
      'bulbasaur',
      Phaser.Math.Between(30, 100)
    );

    this.monsters.add(monster, true);

    // create monster class
    // appear
    // typing bubble appear
  }

  update() {}
}
