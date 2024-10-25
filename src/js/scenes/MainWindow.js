import { BlastField } from "../classes/BlastField";
import { Bonus } from "../classes/Bonus";
import { ButtonPause } from "../classes/ButtonPause";
import { HeaderElements } from "../classes/HeaderElements";
import { MixingColors } from "../classes/MixingColors";
import { ModalPause } from "../classes/ModalPause";
import { ModalWinLose } from "../classes/ModalWinLose";
import { ProgressBar } from "../classes/ProgressBar";
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
	mixingColors;
	modalPause;
	modalWinLose;
	bonusRadius;
	bonusLine;
	movesLeftValue = 50;
    remainingPoints = 1000;
	isActiveBonusRadius = false;
	isActiveBonusLine = false;
	bonusRadiusCount = 5;
	bonusLineCount = 0;
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
		this.headerElements = new HeaderElements(this, this.config.headerElements, this.movesLeftValue, this.remainingPoints);
		this.progressBar = new ProgressBar(this, this.config.progressBar, this.remainingPoints);
		this.scoreField = new ScoreField(this, this.config.scoreField);
		this.blastField = new BlastField(this, this.config.blastField, 10, 9);
        this.make.text(this.config.bonusesDescription);
		this.bonusRadius = new Bonus(this, this.config.bonusRadius, this.bonusRadiusCount, "R");
		this.bonusLine = new Bonus(this, this.config.bonusLine, this.bonusLineCount, "L");
		this.mixingColors = new MixingColors(this, this.config.mixingColors, this.countMixingColors);
		this.btnPause = new ButtonPause(this, this.config.btnPause);
		this.modalPause = new ModalPause(this, this.config.modalPause);
		this.modalWinLose = new ModalWinLose(this, this.config.modalWinLose);
	}

	/**
     * Метод который вернёт значение выбранного бонуса
     * @public
     **/
	getActiveBonus() {
		if (this.isActiveBonusRadius) {
			return "0"
		}
		if (this.isActiveBonusLine) {
			return "1"
		}
		return false;
	}

	/**
     * Метод который отобразит модальное окно с информацией о конце игры
     * @public
     * @param {boolean} state - true(отобразить)/false(скрыть)
	 * 
     **/
	showHideModalWinLoseGame(state) {
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
		this.countMixingColors = 2;
		this.isActiveBonusRadius = false;
		this.isActiveBonusLine = false;
		this.bonusRadiusCount = 5;
		this.bonusLineCount = 0;
		this.headerElements.resetHeaderElements(this.movesLeftValue, this.remainingPoints);
		this.progressBar.resetProgressBar();
		this.scoreField.resetScoreField();
		this.blastField.mixingBlocksColor();
		this.activeDisableAllInteractiveElements(true);
		this.mixingColors.resetMixingColors(this.countMixingColors);
		this.bonusRadius.resetBonus(this.bonusRadiusCount);
		this.bonusLine.resetBonus(this.bonusLineCount);
		this.modalWinLoseCamera.setVisible(false);
	}

	/**
     * Проверка игры на проигрыш
     * @public
     **/
	checkGameState() {
		let win = this.progressBar.fillValue >= 1;
		let lose = this.movesLeftValue < 1 || !checkForAdjacentColorPairs(this.blastField.arrBlocks);

		if (win) {
			this.activeDisableAllInteractiveElements(false);
			setTimeout(() => this.showHideModalWinLoseGame(true), 1000);
		} else if(lose) {
			this.activeDisableAllInteractiveElements(false);
			setTimeout(() => this.showHideModalWinLoseGame(false), 1000);
		}
	}

	/**
     * Метод для блокировки/разблокировки всех интерактивных элементов
     * @public
     * @param {boolean} state - true(разблокировать)/false(заблокировать)
     **/
	activeDisableAllInteractiveElements(state) {
		this.bonusRadius.activeDisableBonus(state);
		this.bonusLine.activeDisableBonus(state);
		if (!state) {
			this.bonusRadius.showHideBonus(state);
			this.bonusLine.showHideBonus(state);
		}
		this.blastField.activeDisableAllBlocks(state);
		this.mixingColors.activeDisableMixingColorsBtn(state);
		this.btnPause.activeDisableBtn(state);
	}

	/**
     * Метод для обновления значения бонуса с линиями
     * @public
     **/
	updateBonusLine() {
		this.bonusLine.activeDisableBonus(true);
		this.bonusLine.setBonusCount(1);
	}

	/**
     * Метод для обновления значения поля "Осталось ходов"
     * @public
     **/
	updateMovesLeft() {
		this.movesLeftValue--;
		this.headerElements.updateMovesLeft(this.movesLeftValue);
	}

	/**
     * Метод для обновления значения поля "Осталось"
     * @public
     * @param {number} value - новое значение поля "Осталось"
     **/
	updateRemainingPoints(value) {
		this.remainingPoints = value;;
		this.headerElements.updateRemainingPoints(this.remainingPoints);
	}

	/**
     * Метод для обработки клика по конопке перемешать
     * @public
     **/
	handleButtonMixingClick() {
        this.countMixingColors--;
		this.blastField.mixingBlocksColor(true);
        this.mixingColors.updateMixingColorsText(this.countMixingColors);
		this.countMixingColors === 0 && this.mixingColors.activeDisableMixingColorsBtn(false);
	}

	/**
     * Метод для обработки клика по конопке "Заново"
     * @public
     **/
	handleButtonRefreshClick() {
		this.refreshGame();
	}

	/**
     * Метод для обработки клика по конопке "Pause"
     * @public
     **/
	handleButtonPauesClick() {
		this.modalPauseCamera.setVisible(true);
	}

	/**
     * Метод для обработки клика по конопке "Close"
     * @public
     **/
	handleButtonCloseClick() {
		this.modalPauseCamera.setVisible(false);
	}

	/**
     * Метод для обработки клика по заднему фону модального окна "ModalPause"
     * @public
     **/
	handleModalPauseBgClick() {
		this.modalPauseCamera.setVisible(false);
	}

	/**
	 * Проверка на возможность продолжить игру после перемешивания
     * @public
     **/
	checkPosibilityToContinueGame() {
		if (
			this.countMixingColors === 0 
			&& !checkForAdjacentColorPairs(this.blastField.arrBlocks) 
			&& this.bonusRadiusCount === 0 
			&& this.bonusLineCount === 0
		) {
			this.activeDisableAllInteractiveElements(false);
			setTimeout(() => this.scene.showHideModalWinLoseGame(false), 1000);
		}
	}
}