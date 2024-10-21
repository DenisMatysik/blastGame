export class ButtonRefresh {
    scene;
    config;
    image;
    text;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements(config);
        this._createEvents();
    }

    /**
     * Метод создает элементы кнопки
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.image = this.scene.make
            .image(config.image)
            .setInteractive({cursor: "pointer"});
        this.text = this.scene.make.text(config.text);
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => this.scene.refreshGame());
    }
}