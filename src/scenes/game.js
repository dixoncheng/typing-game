import Phaser from 'phaser';
import Monster from '../objects/Monster';
import Explosion from '../objects/Explosion';
import explodeImg from '../assets/explode.png';
import skyImg from '../assets/sky.png';

import monstersList from '../data/list.json';

const imagePath =
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/';
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/';
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');

    // todo get random X number of monsters
    this.monstersList = monstersList.results.map(({ name, url }) => {
      const trimmed = url.slice(0, -1);
      const id = trimmed.substr(trimmed.lastIndexOf('/') + 1);
      return { name, texture: id };
    });
    // console.log(this.monstersList);
  }

  preload() {
    this.load.image('sky', skyImg);
    this.load.bitmapFont(
      'carrier_command',
      'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.png',
      'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.xml'
    );

    this.load.spritesheet('explosion', explodeImg, {
      frameWidth: 33,
      frameHeight: 33
    });

    for (const { texture } of this.monstersList) {
      // console.log(monster);
      this.load.image(`monster${texture}`, `${imagePath}${texture}.png`);
    }
  }

  create() {
    const { width: gameWidth, height: gameHeight } = this.game.config;

    // bg
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setScale(2);

    const { name, texture } = this.monstersList[0];

    this.monsters = this.add.group();
    const monster = new Monster(
      this,
      200,
      100,
      `monster${texture}`,
      name.toUpperCase(),
      Phaser.Math.Between(30, 100)
    );

    this.monsters.add(monster, true);

    this.anims.create({
      key: 'explode',
      frames: 'explosion',
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true
    });

    // input
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
        console.log('finish word');
        // word is finished

        this.monsters.killAndHide(monster);

        new Explosion(this, monster.x, monster.y, 'explosion');
      }
    }
  }

  update() {}
}
