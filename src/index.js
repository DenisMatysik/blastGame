import Phaser, {Scale} from 'phaser';

const config = {
    type: Phaser.AUTO,
    parent: "blastGame",
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 2220,
        height: 1080,
    },
    scene: {
        preload() {
            this.load.image('logo', 'assets/logo.png');
        },
        create() {
            this.add.image(400, 300, 'logo');
        },
    },
};

const game = new Phaser.Game(config);