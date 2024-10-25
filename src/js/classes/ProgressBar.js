export class ProgressBar {
    scene;
    
    fill;
    fillValue = 0;
    allPoints = 0;

    constructor(scene, config, allPoints) {
        this.scene = scene;
        this.config = config;
        this.allPoints = allPoints;

        this._createElements();
        this.resetProgressBar();
    }

    /**
     * Метод создает элементы класса ProgressBar
     * @private
     **/
    _createElements() {
        this.scene.make.image(this.config.bg);
        this.scene.make.text(this.config.text);
        this.fill = this.scene.make.image(this.config.fill);
    }

    /**
     * Метод для обновления полосы 
     * @public
     * @param {number} value - значение от 0-1, где 1 - 100% видимость элемента
     **/
    updateProgressFillBar(value) {
        const CURRENT_FILL_VALUE = value / this.allPoints;
        this.fillValue = parseFloat((this.fillValue + CURRENT_FILL_VALUE).toFixed(3));
		this.fill.setCrop(0, 0, this.fill.width * this.fillValue, this.fill.height);
	}

    /**
     * Метод для сброса значений класса ProgressBar
     * @public
     **/
    resetProgressBar() {
        this.fill.setCrop(0, 0, 0, this.fill.height);
        this.fillValue = 0;
    }
}