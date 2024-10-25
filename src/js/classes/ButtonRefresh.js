export class ButtonRefresh {
    scene;
    config;
    image;
    text;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements();
        this._createEvents();
    }

    /**
     * Метод создает элементы класса ButtonRefresh
     * @private
     **/
    _createElements() {
        this.image = this.scene.make
            .image(this.config.image)
            .setInteractive({cursor: "pointer"});
        this.text = this.scene.make.text(this.config.text);
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => this.scene.handleButtonRefreshClick());
    }
}