import {config} from "../constants/mainWindowGC";

export class MainWindow extends Phaser.Scene {
    config;

    constructor() {
        super("MainWindow");
    }

    create() {
        this.config = config.call(this);
        this.make.image(this.config.bg);
    }
}