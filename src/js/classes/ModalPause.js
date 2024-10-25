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

        this._createElements();
        this._createEvents();
        // Отключаем отображение элементов в других камерах
        this.children.forEach(el => {
            this.scene.cameras.main.ignore(el);
            this.scene.blastFieldCamera.ignore(el);
            this.scene.modalWinLoseCamera.ignore(el);
        });
    }

    /**
     * Метод создает элементы класса ModalPause
     * @private
     **/
    _createElements() {
        this.bg = this.scene.make
            .image(this.config.bg)
            .setInteractive({cursor: "pointer"});
        const btnClose = new ButtonClose(this.scene, this.config.btnClose);
        const frame = this.scene.make
            .image(this.config.frame)
            .setInteractive();
        const bonusesText = this.scene.make.text(this.config.bonusesText);
        const markerActiveBonus = this.scene.make.image(this.config.markerActiveBonus);
        const textActiveBonus = this.scene.make.text(this.config.textActiveBonus);
        const bonusRadiusText = this.scene.make.text({
            ...this.config.bonusRadiusText,
            text: `${this.config.bonusRadiusText.text} ${this.scene.radiusBlast}`
        });
        const bonusLineText = this.scene.make.text(this.config.bonusLineText);
        const scoreText = this.scene.make.text(this.config.scoreText);
        const superBonusText = this.scene.make.text(this.config.superBonusText);

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

        this.scene.config.blockColors.forEach((color, index) => {
            const ROW = Math.floor(index / 2);
            const block = this.scene.make.image({
                ...this.config.block,
                x: this.config.block.x + (index % 2) * this.config.block.offsetX,
                y: this.config.block.y + ROW * this.config.block.offsetY,
                key: color
            });
            const text = this.scene.make.text({
                ...this.config.text,
                x: this.config.text.x + (index % 2) * this.config.text.offsetX,
                y: this.config.text.y + ROW * this.config.text.offsetY,
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
        this.bg.on("pointerup", () => this.scene.handleModalPauseBgClick());
    }
}