import { BlastField } from "../classes/BlastField";
import { Bonus } from "../classes/Bonus";
import { ButtonPause } from "../classes/ButtonPause";
import { HeaderElements } from "../classes/HeaderElements";
import {ProgressBar} from "../classes/ProgressBar";
import { ScoreField } from "../classes/ScoreField";
import {config} from "../constants/mainWindowGC";

export class MainWindow extends Phaser.Scene {
	config;
	headerElements;
	progressBar;
	scoreField;
	blastField;
	btnPause;
	movesLeftValue = 25;
    totalScoreValue = 100;
	bonuses = [];
	activeBonus = {
		5: false,
		15: false
	};

	constructor() {
		super("MainWindow");
	}

	create() {
		this.config = config.call(this);
		this.make.image(this.config.bg);

		this.headerElements = new HeaderElements(this, this.config.headerElements);
		this.progressBar = new ProgressBar(this, this.config.progressBar);
		this.scoreField = new ScoreField(this, this.config.scoreField);
		this.blastField = new BlastField(this, this.config.blastField);
		this.bonuses.push(new Bonus(this, this.config.firstBonus, 5));
		this.bonuses.push(new Bonus(this, this.config.secondBonus, 15));
		this.btnPause = new ButtonPause(this, this.config.btnPause);
	}
}