export class ProgressBar {
    fill;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
        this.resetProgressFillBar();
    }

    /**
     * Метод создает элементы поля "Прогресс"
     * @private
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.scene.make.text(config.text);
        this.fill = this.scene.make.image(config.fill);
    }

    /**
     * Метод для обновления полосы загрузки "Прогресс"
     * @public
     * @param {number} value - значение от 0-1, где 1 - 100% видимость элемента
     **/
    updateProgressFillBar(value) {
		this.fill.setCrop(0, 0, this.fill.width * value, this.fill.height);
	}

    /**
     * Метод для сброса полосы загрузки "Прогресс"
     * @public
     **/
    resetProgressFillBar() {
        this.fill.setCrop(0, 0, 0, this.fill.height);
    }
}