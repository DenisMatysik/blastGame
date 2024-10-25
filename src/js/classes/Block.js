import { randomIntBetween0And4 } from "../functions";

export class Block {
    scene;
    config;
    parent;
    image;
    text;

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

        this._createElements();
        this._createEvents();
    }

    /**
     * Метод создает элементы класса Block
     * @private
     **/
    _createElements() {
        this.image = this.scene.make.image({
            x: this.config.x,
            y: this.config.y,
            key: this.config.key,
            depth: this.config.depth,
            origin: this.config.origin
        })
        .setInteractive({cursor: "pointer"});
        this.text = this.scene.make.text({
            x: this.config.x + this.config.offsetTextX,
            y: this.config.y + this.config.offsetTextY,
            depth: this.config.depth,
            origin: this.config.origin,
            text: this.config.text,
            style: this.config.style,
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
        this.image.on("pointerup", () => 
            this.parent.handleBlockClick(this.rowIndex, this.colIndex, this.color, this.text.visible)
        );
    }

    /**
     * Метод который задаёт случайны цвет блоку
     * @public
     **/
    setRandomColor() {
        const UPDATED_COLOR = this.scene.config.blockColors[randomIntBetween0And4()];
        this.color = UPDATED_COLOR;
        this.image.setTexture(UPDATED_COLOR);
    }

    /**
     * Метод который запустит анимацию падения элемента
     * @public
     * @param {number} y - координата на которую должен подняться блок
     **/
    startAnimationFallingBlock(y) {
        const OFFSET_TEXT_Y = this.config.offsetTextY;
        this.scene.tweens.add({
            targets: [this.image, this.text],
            y: function(target, key, value, targetIndex) { 
                return targetIndex === 0 ? y : y + OFFSET_TEXT_Y
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