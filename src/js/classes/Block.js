import { dfs } from "../functions";

export class Block extends Phaser.GameObjects.Sprite {
    rowIndex;
    colIndex;
    color;
    parent;

    /**
     * Класс описывает кнопку с числом.
     * @public
     * @param {Phaser.Scene} scene - Сцена в которой будет создан объект.
     * @param {PageNumberSelection} page - Объект страницы.
     * @param {NumbersField} numbersField - Объект поля с цифрами
     * @param {{
     *  x: number,
     *  y: number,
     *  key: string,
     *  origin: {
     *      x: number,
     *      y: number
     *  } | number | null
     * }} config - конфигурация для создания объекта
    **/
    constructor(scene, colIndex, rowIndex, {x, y, key, origin, depth}, parent) {
        super(scene, x, y, key);
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.color = key;
        this.parent = parent;
        this.scene.add.existing(this);
        this
            .setDepth(depth)
            .setOrigin(origin.x, origin.y)
            .setInteractive({cursor: "pointer"});
        this._createEvents();
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.on("pointerup", () => {
            const visited = Array.from({ length: this.parent.rows }, () => Array(this.parent.cols).fill(false));
            const group = [];

            dfs(this.rowIndex, this.colIndex, this.color, visited, group, this.parent.arrBlocks);

            if (group.length >= 2) {
                group.forEach(([row, column]) => {
                    console.log("добавить удаление элемента или перемещение его");
                    this.parent.arrBlocks[row][column].setVisible(false);
                });
                this.parent.startAnimationFallingBlocks();
            }
        });
    }
}