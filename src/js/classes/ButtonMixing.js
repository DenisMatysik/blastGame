export class ButtonMixing {
    scene;
    config;
    image;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements();
        this._createEvents();
    }

    /**
     * Метод создает элементы класса ButtonMixing
     * @private
     **/
    _createElements() {
        this.image = this.scene.make
            .image(this.config)
            .setInteractive({cursor: "pointer"});
    }

        /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => this.scene.handleButtonMixingClick());
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