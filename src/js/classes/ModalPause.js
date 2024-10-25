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
        // Отключаем отображение элементов в других камерах
        this.children.forEach(el => {
            this.scene.cameras.main.ignore(el);
            this.scene.blastFieldCamera.ignore(el);
            this.scene.modalWinLoseCamera.ignore(el);
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
        const bonusesText = this.scene.make.text(config.bonusesText);
        const markerActiveBonus = this.scene.make.image(config.markerActiveBonus);
        const textActiveBonus = this.scene.make.text(config.textActiveBonus);
        const bonusRadiusText = this.scene.make.text({
            ...config.bonusRadiusText,
            text: `${config.bonusRadiusText.text} ${this.scene.radiusBlast}`
        });
        const bonusLineText = this.scene.make.text(config.bonusLineText);
        const scoreText = this.scene.make.text(config.scoreText);
        const superBonusText = this.scene.make.text(config.superBonusText);


        this.children = [
            this.bg,
            btnClose.image,
            frame,
            scoreText,
            bonusesText,
            markerActiveBonus,
            textActiveBonus,
            bonusRadiusText,
            bonusLineText,
            superBonusText
        ];
        config.blockColors.forEach((color, index) => {
            const ROW = Math.floor(index / 2);
            const block = this.scene.make.image({
                ...config.block,
                x: config.block.x + (index % 2) * config.block.offsetX,
                y: config.block.y + ROW * config.block.offsetY,
                key: color
            });
            const text = this.scene.make.text({
                ...config.text,
                x: config.text.x + (index % 2) * config.text.offsetX,
                y: config.text.y + ROW * config.text.offsetY,
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