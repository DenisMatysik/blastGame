export class HeaderElements {
    scene;

    movesLeft;
    scoreRemaining;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
        this.updateMovesLeft(this.scene.movesLeftValue);
        this.updateRemainingPoints(this.scene.remainingPoints);
    }

    /**
     * Метод создает элементы для шапки приложения
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.scene.make.image(config.redField);
        this.scene.make.image(config.purpleField);
        this.scene.make.text(config.redFieldText);
        this.scene.make.text(config.purpleFieldText);
        this.movesLeft = this.scene.make.text(config.redFieldValue);
        this.scoreRemaining = this.scene.make.text(config.purpleFieldValue);
    }

    /**
     * Метод обновляет значение оставихся очков
     * @public
     * @param {number} value - новое значение поля "Осталось"
     **/
    updateRemainingPoints(value) {
        this.scene.remainingPoints = value;
        this.scoreRemaining.setText(this.scene.remainingPoints);
    }

    /**
     * Метод обновляет значение счётчика оставшихся ходов
     * @public
     * @param {number} value - новое значение счётчика
     **/
    updateMovesLeft (value) {
        value 
            ? this.scene.movesLeftValue = value
            : this.scene.movesLeftValue -= 1;
        this.movesLeft.setText(this.scene.movesLeftValue);
    }
}