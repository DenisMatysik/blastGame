export class MovedImage {
    scene;
    config;
    image;

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createElements();
    }

    /**
     * Метод создает элементы класса MovedImage
     * @private
     **/
    _createElements() {
        this.image = this.scene.make.image(this.config);
    }

    /**
     * Метод для запуска анимации полёта картинки
     * @private
     * @param {number} x - точка по х куда полетиит блок
     * @param {number} y - точка по y куда полетиит блок
     * @param {boolean} isMovedToBonusLine - символ должен лететь к бонусу с линиями
     **/
    startAnimationMovingBlock(x, y, isMovedToBonusLine) {
        this.scene.tweens.add({
            targets: this.image,
            x: x,
            y: y,
            alpha: isMovedToBonusLine ? 0.5 : 1,
            duration: 500,
            ease: 'Linear',
            onComplete: (tween) => {
                this.image.destroy();
                tween.destroy();
                isMovedToBonusLine && this.scene.updateBonusLine();
            }
        });
    }
}