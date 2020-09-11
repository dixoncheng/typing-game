import Phaser from 'phaser';
import Monster from '../objects/Monster';
import Explosion from '../objects/Explosion';
import explodeImg from '../assets/explode.png';
import skyImg from '../assets/sky.png';

import monstersList from '../data/list.json';

const monsterMaxWidth = 125;
const monsterSize = 80;
const spawnSpeed = 3000;
const dropSpeedMin = 30;
const dropSpeedMax = 50;

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

    // randomise
    this.monstersList = this.monstersList.sort(() => Math.random() - 0.5);
    this.monsterIndex = 0;
    this.currentMonster = null;
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
      this.load.image(`monster${texture}`, `${imagePath}${texture}.png`);
    }
  }

  create() {
    const { width: gameWidth, height: gameHeight } = this.game.config;

    // bg
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setScale(2);

    // monsters
    this.monsters = this.add.group();

    // this.createMonster();
    // this.monsterIndex += 1;
    // this.createMonster();
    // this.monsterIndex += 1;
    // this.createMonster();

    this.createMonster();
    this.time.addEvent({
      delay: spawnSpeed,
      loop: true,
      callback: () => {
        if (this.monsterIndex < this.monstersList.length) {
          this.createMonster();
        }
      }
    });

    // explosion
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

  createMonster() {
    const { width: gameWidth } = this.game.config;
    const { name, texture } = this.monstersList[this.monsterIndex];
    const monster = new Monster(
      this,
      Phaser.Math.Between(monsterMaxWidth, gameWidth - monsterMaxWidth),
      // Phaser.Math.Between(35, 400),
      -monsterMaxWidth,
      `monster${texture}`,
      name.toUpperCase(),
      Phaser.Math.Between(dropSpeedMin, dropSpeedMax)
    );
    this.monsters.add(monster, true);
    this.monsterIndex += 1;
  }

  keyPress(event) {
    // if currently typing a monster, must continue
    if (this.currentMonster) {
      // const monster = this.monsters.children.entries[0]; //TEMP
      const { name, correctCount } = this.currentMonster;
      if (name.charCodeAt(correctCount) === event.keyCode) {
        this.currentMonster.correctCount += 1;
        if (this.currentMonster.correctCount >= name.length) {
          // word is finished
          // this.monsters.killAndHide(this.currentMonster);
          this.monsters.remove(this.currentMonster, true, true);
          new Explosion(
            this,
            this.currentMonster.x,
            this.currentMonster.y,
            'explosion'
          );
          this.currentMonster = null;
        }
      }
    } else {
      // find which monster can be started
      this.monsters.children.iterate((monster) => {
        if (monster.name.charCodeAt(0) === event.keyCode) {
          this.currentMonster = monster;
          this.currentMonster.correctCount += 1;
          return false;
        }
      });
    }
  }

  update() {
    // remove monster from group if it dropped out of view
    this.monsters.children.iterate((monster) => {
      if (monster) {
        if (monster.y > this.game.config.height + monsterSize / 2) {
          this.monsters.remove(monster, true, true);
          if (this.currentMonster === monster) {
            this.currentMonster = null;
          }
        }
      }
    });

    // if group is empty
    // show end screen
    // Finished! You've got 20/20
  }
}
