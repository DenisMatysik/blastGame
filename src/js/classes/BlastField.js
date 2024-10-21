import { randomIntBetween0And4 } from "../functions";
import { Block } from "./Block";

export class BlastField {
    scene;
    config;
    blastFieldCamera;
    arrBlocks = [];

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this._createCamera(config.camera);
        this._createElements(config);
    }

    /**
     * Метод создает камеру, в которой будут отображаться блоки поля "BlastField"
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createCamera(config) {
        this.blastFieldCamera = this.scene.cameras.add(
            config.x,
            config.y,
            config.width,
            config.heigth
        );
        this.blastFieldCamera.setScroll(
            config.x,
            config.y
        );
    }

    /**
     * Метод создает элементы поля "BlastField"
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config) {
        this.scene.make.image(config.bg);
        this.arrBlocks = Array.from({ length: config.rows }, (_, y) => 
            Array.from({ length: config.cols }, (_, i) => 
                new Block(
                    this.scene, 
                    i,
                    y,
                    {
                        ...config.block,
                        key: config.blocksName[randomIntBetween0And4()],
                        x: config.block.initialX + i * config.block.width,
                        y: config.block.initialY + y * (config.block.heigth - config.block.offsetY),
                        depth: config.block.initialDepth - config.cols * y + i,
                    },
                    this
                )
            )
        );
    }

    /**
     * Метод запуска анимации полёта блоков вниз
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    activeDisableAllBlocks(state) {
        this.arrBlocks.forEach(row => row.forEach(block => state
            ? block.image.setInteractive({cursor: "pointer"})
            : block.image.disableInteractive()
        ));
    }
}