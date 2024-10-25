export class HeaderElements {
    scene;

    movesLeft;
    scoreRemaining;

    constructor(scene, config, movesLeftValue, remainingPoints) {
        this.scene = scene;
        this.config = config;

        this._createElements(movesLeftValue, remainingPoints);
    }

    /**
     * Метод создает элементы класса HeaderElements
     * @private
     * @param {number} movesLeftValue - значение поля "Осталось ходов"
     * @param {number} remainingPoints - новое значение поля "Осталось"
     **/
    _createElements(movesLeftValue, remainingPoints) {
        this.scene.make.image(this.config.bg);
        this.scene.make.image(this.config.redField);
        this.scene.make.image(this.config.purpleField);
        this.scene.make.text(this.config.redFieldText);
        this.scene.make.text(this.config.purpleFieldText);
        this.movesLeft = this.scene.make.text({
            ...this.config.redFieldValue, 
            text: movesLeftValue
        });
        this.scoreRemaining = this.scene.make.text({
            ...this.config.purpleFieldValue,
            text: remainingPoints
        });
    }

    /**
     * Метод обновляет значение оставихся очков
     * @public
     * @param {number} value - новое значение поля "Осталось"
     **/
    updateRemainingPoints(value) {
        this.scoreRemaining.setText(value);
    }

    /**
     * Метод обновляет значение счётчика оставшихся ходов
     * @public
     * @param {number} value - новое значение поля "Осталось ходов"
     **/
    updateMovesLeft (value) {
        this.movesLeft.setText(value);
    }

    /**
     * Метод сбросит все значения класса HeaderElements
     * @public
     **/
    resetHeaderElements(movesLeftValue, remainingPoints) {
        this.movesLeft.setText(movesLeftValue);
        this.scoreRemaining.setText(remainingPoints);
    }
}