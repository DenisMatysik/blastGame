import { BlastField } from "../classes/BlastField";
import { Bonus } from "../classes/Bonus";
import { ButtonPause } from "../classes/ButtonPause";
import { HeaderElements } from "../classes/HeaderElements";
import { ModalPause } from "../classes/ModalPause";
import {ProgressBar} from "../classes/ProgressBar";
import { ScoreField } from "../classes/ScoreField";
import {config} from "../constants/mainWindowGC";

export class MainWindow extends Phaser.Scene {
	config;
	blastFieldCamera;
	modalPauseCamera;
	headerElements;
	progressBar;
	scoreField;
	blastField;
	btnPause;
	movesLeftValue = 50;
    remainingPoints = 1000;
	bonuses = [];
	activeBonuses = {
		0: false,
		1: false,
		2: false,
	};
	radiusBlast = 3;

	constructor() {
		super("MainWindow");
	}

	create() {
		this.config = config.call(this);

		this._createCameras();
		this._createElements();
	}

	/**
     * Метод для создания всех камер в приложении
     * @private
     **/
    _createCameras() {
        this.blastFieldCamera = this.cameras.add(
            this.config.blastField.camera.x,
            this.config.blastField.camera.y,
            this.config.blastField.camera.width,
            this.config.blastField.camera.heigth
        );
        this.blastFieldCamera.setScroll(
            this.config.blastField.camera.x,
            this.config.blastField.camera.y
        );
		this.blastFieldCamera.name = "blastFieldCamera";
		this.modalPauseCamera = this.cameras.add(
            this.config.modalPause.camera.x,
            this.config.modalPause.camera.y,
            this.config.modalPause.camera.width,
            this.config.modalPause.camera.heigth
        );
        this.modalPauseCamera.setScroll(
            this.config.modalPause.camera.x,
            this.config.modalPause.camera.y
        );
		this.modalPauseCamera.name = "modalPauseCamera";
		this.modalPauseCamera.setVisible(false);
    }

	/**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     **/
    _createElements() {
		this.make.image(this.config.bg);
		this.headerElements = new HeaderElements(this, this.config.headerElements);
		this.progressBar = new ProgressBar(this, this.config.progressBar);
		this.scoreField = new ScoreField(this, this.config.scoreField);
		this.blastField = new BlastField(this, this.config.blastField);
        this.make.text(this.config.bonusesDescription);
		this.bonuses.push(new Bonus(this, this.config.firstBonus, 5, "R", 0));
		this.bonuses.push(new Bonus(this, this.config.secondBonus, 0, "T", 1));
		this.bonuses.push(new Bonus(this, this.config.thirdBonus, 0, "?", 2));
		this.btnPause = new ButtonPause(this, this.config.btnPause);
		this.modalPause = new ModalPause(this, this.config.modalPause);
	}

	/**
     * Метод который вернёт значение выбранного бонуса
     * @public
     **/
	getActiveBonus() {
		for (const key in this.activeBonuses) {
			if (this.activeBonuses[key] === true) {
				return key;
			}
		}
		return false;
	}
}