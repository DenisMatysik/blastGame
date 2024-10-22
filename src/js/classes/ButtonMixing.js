export class ButtonMixing {
    scene;
    config;
    image;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements(config);
        this._createEvents();
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.image = this.scene.make
            .image(config)
            .setInteractive({cursor: "pointer"});
    }

        /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            this.scene.blastField.mixingBlocksColor(true);
            this.scene.countMixingColors--;
            this.scene.mixingColorsFrame.updateMixingColorsText(this.scene.countMixingColors);
            if (this.scene.countMixingColors === 0) {
                this.activeDisableBtn(false);
            }
        });
    }

    /**
     * Метод блокировки/разблокировки кнопки
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    activeDisableBtn(state) {
        state
            ? this.image.setInteractive({cursor: "pointer"}).setAlpha(1)
            : this.image.disableInteractive().setAlpha(0.5);
    }
}