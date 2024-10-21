import { ButtonRefresh } from "./ButtonRefresh";

export class ModalWinLose {
    scene;
    config;
    text;
    children = [];

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements(config);
        // Отключаем отображение элементов в других камерах
        this.children.forEach(el => {
            this.scene.cameras.main.ignore(el);
            this.scene.blastFieldCamera.ignore(el);
            this.scene.modalPauseCamera.ignore(el);
        });
    }

    /**
     * Метод создает элементы модального окна
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        const bg = this.scene.make
            .image(config.bg)
            .setInteractive();
        this.text = this.scene.make.text(config.text);
        const btnRefresh = new ButtonRefresh(this.scene, config.btnRefresh);

        this.children = [
            bg,
            this.text,
            btnRefresh.image,
            btnRefresh.text,
        ];
    }

    /**
     * Метод для обновления текста модального окна
     * @public
     * @param {boolean} state - true(выиграли)/false(проиграли)
     **/
    updateModal(state) {
        this.text.setText(this.config.text[state ? "text" : "alterText"]);
    }
}