import MainScene from './mainScene.js';
const config= {
    height:525,
    width:1530,
    parent:'gameContainer',
    scene:[MainScene],
    type:Phaser.AUTO
}
console.log('heloo ')
new Phaser.Game(config);