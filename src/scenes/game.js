import Phaser from 'phaser';
import skyImg from '../assets/sky.png';
import Monster from '../objects/Monster';

import monsters from '../data/list.json';

const imagePath =
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/';
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/';
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('sky', skyImg);
    this.load.image('test', `${imagePath}1.png`);
    this.load.bitmapFont(
      'carrier_command',
      'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.png',
      'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.xml'
    );
  }

  create() {
    const { width: gameWidth, height: gameHeight } = this.game.config;

    // bg
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setScale(2);

    this.monsters = this.add.group();
    const monster = new Monster(
      this,
      200,
      100,
      'test',
      String('bulbasaur').toUpperCase(),
      Phaser.Math.Between(30, 100)
    );

    this.monsters.add(monster, true);

    // create monster class
    // appear
    // typing bubble appear

    this.input.keyboard.on('keyup', this.keyPress, this);
  }

  keyPress(event) {
    // todo check if currently started a word
    // else find monster with the correct first letter, begin word

    // this.events.emit('typing', event.keyCode);
    const monster = this.monsters.children.entries[0]; //TEMP
    const { name, correctCount } = monster;
    if (name.charCodeAt(correctCount) === event.keyCode) {
      monster.correctCount += 1;
      if (monster.correctCount >= name.length) {
        // word is finished
        // play exit animation
        // remove from group
      }
    }
  }

  update() {}
}
