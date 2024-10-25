export class ScoreField {
    scene;
    currentScore;
    allScore;

    allScoreValue = 0;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements();
    }

    /**
     * Метод создает элементы класса ScoreField
     * @private
     **/
    _createElements() {
        this.scene.make.image(this.config.bg);
        this.scene.make.text(this.config.scoreDescription);
        this.currentScore = this.scene.make.text(this.config.currentScore);
        this.allScore = this.scene.make.text(this.config.allScore);
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
     * Метод для сброса значений класса ScoreField
     * @public
     **/
    resetScoreField() {
        this.allScoreValue = 0;
        this.currentScore.setText(0);
        this.allScore.setText(0);
    }
}
