import Phaser, {Scale} from 'phaser';
import { Loader } from './js/scenes/Loader';
import { MainWindow } from './js/scenes/MainWindow';

const config = {
    type: Phaser.AUTO,
    parent: "blastGame",
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    autoFocus: true,
    render: {
        batchSize: 512,
        antialiasGL: false,
    },
    scene: [Loader, MainWindow]
    // scene: {
    //     preload() {
    //         this.load.image('bg', 'assets/imgs/bg.png');
    //     },
    //     create() {
    //         this.add.image(0, 0, 'bg');
    //     },
    // },
};

const game = new Phaser.Game(config);