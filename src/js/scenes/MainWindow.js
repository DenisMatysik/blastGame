import {ProgressBar} from "../classes/ProgressBar";
import {config} from "../constants/mainWindowGC";

export class MainWindow extends Phaser.Scene {
	config;

	constructor() {
		super("MainWindow");
	}

	create() {
		this.config = config.call(this);
		this.make.image(this.config.bg);
		this.make.image(this.config.header);

		this.progressBar = new ProgressBar(this, this.config.progressBar);
	}
}