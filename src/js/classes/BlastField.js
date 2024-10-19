import { randomIntBetween0And4 } from "../functions";
import { Block } from "./Block";

export class BlastField {
    arrBlocks = [];
    rows = 10;
    cols = 9;

    constructor(scene, config) {
        this.scene = scene;

        this._createElements(config);
    }

    /**
     * Метод создает элементы поля "BlastField"
     * @private
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.arrBlocks = Array.from({ length: this.rows }, (_, y) => 
            Array.from({ length: this.cols }, (_, i) => 
                new Block(
                    this.scene, 
                    i,
                    y,
                    {
                        ...config.block,
                        key: config.blocksName[randomIntBetween0And4()],
                        x: config.block.x + i * config.block.width,
                        y: config.block.y + y * config.block.heigth - 8 * y,
                        depth: 81 - 9 * y + i,
                    },
                    this
                )
            )
        );
    }

    /**
     * Метод запуска анимации полёта блоков вниз
     * @public
     **/
    startAnimationFallingBlocks() {
        console.log("startAnimationFallingBlocks");
    }
}