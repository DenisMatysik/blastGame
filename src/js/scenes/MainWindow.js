import { BlastField } from "../classes/BlastField";
import { Bonus } from "../classes/Bonus";
import { ButtonPause } from "../classes/ButtonPause";
import { HeaderElements } from "../classes/HeaderElements";
import { MixingColorsFrame } from "../classes/MixingColorsFrame";
import { ModalPause } from "../classes/ModalPause";
import { ModalWinLose } from "../classes/ModalWinLose";
import {ProgressBar} from "../classes/ProgressBar";
import { ScoreField } from "../classes/ScoreField";
import {config} from "../constants/mainWindowGC";
import { checkForAdjacentColorPairs } from "../functions";

export class MainWindow extends Phaser.Scene {
	config;
	blastFieldCamera;
	modalPauseCamera;
	modalWinLoseCamera;
	headerElements;
	progressBar;
	scoreField;
	blastField;
	btnPause;
	mixingColorsFrame;
	modalPause;
	modalWinLose;
	bonuses = [];
	movesLeftValue = 50;
    remainingPoints = 1000;
	activeBonuses = {
		0: false,
		1: false,
		2: false,
	};
	counterBonuses = {
		0: 5,
		1: 0,
		2: 0,
	};
	radiusBlast = 3;
	countMixingColors = 2;

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
		this.modalPauseCamera = this.cameras.add(
            this.config.modalPause.camera.x,
            this.config.modalPause.camera.y,
            this.config.modalPause.camera.width,
            this.config.modalPause.camera.heigth
        );
		this.modalWinLoseCamera = this.cameras.add(
            this.config.modalWinLose.camera.x,
            this.config.modalWinLose.camera.y,
            this.config.modalWinLose.camera.width,
            this.config.modalWinLose.camera.heigth
        );
        this.blastFieldCamera.setScroll(
            this.config.blastField.camera.x,
            this.config.blastField.camera.y
        );
        this.modalPauseCamera.setScroll(
            this.config.modalPause.camera.x,
            this.config.modalPause.camera.y
        );
        this.modalWinLoseCamera.setScroll(
            this.config.modalWinLose.camera.x,
            this.config.modalWinLose.camera.y
        );
		this.modalPauseCamera.setVisible(false);
		this.modalWinLoseCamera.setVisible(false);
    }

	/**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     **/
    _createElements() {
		this.make.image(this.config.bg);
		this.headerElements = new HeaderElements(this, this.config.headerElements);
		this.progressBar = new ProgressBar(this, this.config.progressBar, this.remainingPoints);
		this.scoreField = new ScoreField(this, this.config.scoreField);
		this.blastField = new BlastField(this, this.config.blastField);
        this.make.text(this.config.bonusesDescription);
		this.bonuses = [
			new Bonus(this, this.config.firstBonus, this.counterBonuses[0], "R", 0),
			new Bonus(this, this.config.secondBonus, this.counterBonuses[1], "T", 1),
			new Bonus(this, this.config.thirdBonus, this.counterBonuses[2], "?", 2)
		];
		this.mixingColorsFrame = new MixingColorsFrame(this, this.config.mixingColorsFrame, this.countMixingColors);
		this.btnPause = new ButtonPause(this, this.config.btnPause);
		this.modalPause = new ModalPause(this, this.config.modalPause);
		this.modalWinLose = new ModalWinLose(this, this.config.modalWinLose);
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

	/**
     * Метод который отобразит модальное окно с информацией о конце игры
     * @public
     **/
	showModalWinLoseGame(state) {
		this.modalWinLose.updateModal(state);
		this.modalWinLoseCamera.setVisible(true);
	}

	/**
     * Метод который сбросит всю игру в начало
     * @public
     **/
	refreshGame() {
		this.movesLeftValue = 50;
    	this.remainingPoints = 1000;
		this.activeBonuses = {
			0: false,
			1: false,
			2: false,
		};
		this.countMixingColors = 2;
		this.headerElements.resetHeaderElements();
		this.progressBar.resetProgressFillBar();
		this.scoreField.resetScoreField();
		this.blastField.mixingBlocksColor();
		this.mixingColorsFrame.resetFrameParams(this.countMixingColors);
		this.bonuses.forEach((bonus, index) => bonus.resetBonus(this.counterBonuses[index]));
		this.modalWinLoseCamera.setVisible(false);
	}

	/**
     * Проверка игры на проигрыш
     * @public
     **/
	checkGameState() {
		if (this.progressBar.fillValue >= 1) {
			this.showModalWinLoseGame(true);
		} else if (this.movesLeftValue < 1) {
			this.showModalWinLoseGame(false);
		} else {
			if (!checkForAdjacentColorPairs(this.blastField.arrBlocks)) {
				if (this.countMixingColors === 0) {
					this.showModalWinLoseGame(false);
				}
			} 
		}
	}
}