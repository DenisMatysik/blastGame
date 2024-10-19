import './css/styles.css';
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
};

const game = new Phaser.Game(config);