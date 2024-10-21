export class ButtonClose {
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
		    this.scene.modalPauseCamera.setVisible(false);
        });
    }
}