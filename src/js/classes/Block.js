import { randomIntBetween0And4 } from "../functions";

export class Block {
    scene;
    config;
    parent;
    image;

    color;
    rowIndex = 0;
    colIndex = 0;

    constructor(scene, colIndex, rowIndex, config, parent) {
        this.scene = scene;
        this.config = config;
        this.parent = parent;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.color = config.key;

        this._createElements(config);
        this._createEvents();
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.image = this.scene.make.image({
            x: config.x,
            y: config.y,
            key: config.key,
            depth: config.depth,
            origin: config.origin
        })
        .setInteractive({cursor: "pointer"});
        this.text = this.scene.make.text({
            x: config.x + config.offsetTextX,
            y: config.y + config.offsetTextY,
            depth: config.depth,
            origin: config.origin,
            text: config.text,
            style: config.style,
            visible: false
        });
        [
            this.scene.cameras.main,
            this.scene.modalPauseCamera,
            this.scene.modalWinLoseCamera
        ].forEach(camera => {
            camera.ignore(this.text);
            camera.ignore(this.image);
        });
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            const superBonusBlock = this.parent.checkSuperBonusBlock();
            console.log("superBonusBlock", superBonusBlock);
            
            this.scene.blastField.handleBlockClick(this.rowIndex, this.colIndex, this.color, this.text.visible);
        });
    }

    /**
     * Метод который задаёт случайны цвет блоку
     * @public
     **/
    setRandomColor() {
        const UPDATED_COLOR = this.parent.config.blocksName[randomIntBetween0And4()];
        this.color = UPDATED_COLOR;
        this.image.setTexture(UPDATED_COLOR);
    }

    /**
     * Метод который запустит анимацию падения элемента
     * @public
     * @param {number} y - координата на которую должен подняться блок
     **/
    startAnimationFallingBlock(y) {
        this.scene.tweens.add({
            targets: [this.image, this.text],
            y: function(target, key, value, targetIndex) { 
                return targetIndex === 0 ? y : y + 12
            },
            duration: 500,
            ease: 'Linear',
            onComplete: (tween) => {
                if (!this.parent.arrBlocks[0][0].image.input.enabled) {
                    this.parent.activeDisableAllBlocks(true);
                    this.scene.checkGameState();
                }
                tween.destroy();
            }
        });
    }

    /**
     * Метод для обновления положения блока и текста
     * @public
     * @param {number} value - новая координата Y
     **/
    setY(value) {
        this.text.setY(value);
        this.image.setY(value);
    }

    /**
     * Метод для обновления порядка отображения элемента
     * @public
     * @param {number} value - новая координата Y
     **/
    setDepth(value) {
        this.text.setDepth(value);
        this.image.setDepth(value);
    }

    /**
     * Метод для обновления положения блока и текста
     * @public
     * @param {boolean} state - true(показать)/скрыть
     **/
    showHideText(state) {
        this.text.setVisible(state);
    }
}