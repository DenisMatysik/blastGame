export class ScoreField {
    allScoreValue = 0;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.scene.make.text(config.scoreDescription);
        this.currentScore = this.scene.make.text(config.currentScore);
        this.allScore = this.scene.make.text(config.allScore);
    }

    /**
     * Метод для обновления значений полей currentScore и allScore
     * @public
     * @param {number} value - очки за последнее действие
     **/
    updateScoreField(value) {
        this.allScoreValue += value;
        this.currentScore.setText(value);
        this.allScore.setText(this.allScoreValue);
    }

    /**
     * Метод для сброса значений полей currentScore и allScore
     * @public
     **/
    resetScoreField() {
        this.allScoreValue = 0;
        this.currentScore.setText(0);
        this.allScore.setText(0);
    }
}
