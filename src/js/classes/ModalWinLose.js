import { ButtonRefresh } from "./ButtonRefresh";

export class ModalWinLose {
    scene;
    config;
    text;
    children = [];

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements();
        
        this.children.forEach(el => { // Отключаем отображение элементов в других камерах
            this.scene.cameras.main.ignore(el);
            this.scene.blastFieldCamera.ignore(el);
            this.scene.modalPauseCamera.ignore(el);
        });
    }

    /**
     * Метод создает элементы класса ModalWinLose
     * @private
     **/
    _createElements() {
        const bg = this.scene.make
            .image(this.config.bg)
            .setInteractive();
        this.text = this.scene.make.text(this.config.text);
        const btnRefresh = new ButtonRefresh(this.scene, this.config.btnRefresh);

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