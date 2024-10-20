export class HeaderElements {
    scene;

    movesLeft;
    totalScore;
    movesLeftValue = 0;
    totalScoreValue = 0;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
        this.updateMovesLeft(25);
    }

    /**
     * Метод создает элементы для шапки приложения
     * @private
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.scene.make.image(config.redField);
        this.scene.make.image(config.purpleField);
        this.scene.make.text(config.redFieldText);
        this.scene.make.text(config.purpleFieldText);
        this.movesLeft = this.scene.make.text(config.redFieldValue);
        this.totalScore = this.scene.make.text(config.purpleFieldValue);
    }

    /**
     * Метод обновляет значение общего счёта
     * @public
     * @param {number} value - значение, на сколько нужно увеличить общий счёт
     **/
    updateTotalScore(value) {
        this.totalScoreValue += value;
        this.totalScore.setText(this.totalScoreValue);
    }

    /**
     * Метод обновляет значение счётчика оставшихся ходов
     * @public
     * @param {number} value - новое значение счётчика
     **/
    updateMovesLeft (value) {
        value 
            ? this.movesLeftValue = value
            : this.movesLeftValue -= 1;
        this.movesLeft.setText(this.movesLeftValue);
    }
}