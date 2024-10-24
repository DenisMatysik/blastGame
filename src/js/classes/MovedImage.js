export class MovedImage {
    scene;
    config;
    image;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
    }

    /**
     * Метод создает картинку
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.image = this.scene.make.image(config);
    }

    /**
     * Метод который запустит анимацию полёта элемента всторону
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