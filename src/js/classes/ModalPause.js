import { getWinValueByColor } from "../functions";
import { ButtonClose } from "./ButtonClose";

export class ModalPause {
    scene;
    config;
    children = [];
    bg;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements(config);
        this._createEvents();
        this.children.forEach(el => {
            this.scene.cameras.main.ignore(el);
            this.scene.blastFieldCamera.ignore(el);
        });
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.bg = this.scene.make
            .image(config.bg)
            .setInteractive({cursor: "pointer"});
        const btnClose = new ButtonClose(this.scene, config.btnClose);
        const frame = this.scene.make
            .image(config.frame)
            .setInteractive();
        const markerActiveBonus = this.scene.make.image(config.markerActiveBonus);
        const textActiveBonus = this.scene.make.text(config.textActiveBonus);

        this.children = [
            this.bg,
            btnClose.image,
            frame,
            markerActiveBonus,
            textActiveBonus
        ];
        config.blockColors.forEach((color, index) => {
            const block = this.scene.make.image({
                ...config.block,
                y: config.block.y + index * config.block.offsetY,
                key: color
            });
            const text = this.scene.make.text({
                ...config.text,
                y: config.text.y + index * config.text.offsetY,
                text: `- ${getWinValueByColor(color, 1)}`
            });
            this.children.push(block);
            this.children.push(text);
        }); 
    }

        /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.bg.on("pointerup", () => {
		    this.scene.modalPauseCamera.setVisible(false);
        });
    }
}