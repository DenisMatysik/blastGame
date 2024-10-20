import { countColumns, dfs, getWinValueByColor, randomIntBetween0And4, sortByColumnAndRow } from "../functions";

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

        this._createElements();
        this._createEvents();
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
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
        this.scene.cameras.main.ignore(this.image);
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            this.parent.activeDisableAllBlocks(false);
            const VISITED = Array.from({ length: this.parent.config.rows }, () => Array(this.parent.config.cols).fill(false));
            const GROUP_EMPTY_ELEMENTS = [];
            dfs(this.rowIndex, this.colIndex, this.color, VISITED, GROUP_EMPTY_ELEMENTS, this.parent.arrBlocks);
            // Сортирую массив, чтобы блоки правильно дальше занимали позиции после поднятия вверх
            sortByColumnAndRow(GROUP_EMPTY_ELEMENTS);
    
            if (GROUP_EMPTY_ELEMENTS.length >= 2) {
                const WIN_VALUE = getWinValueByColor(this.color, GROUP_EMPTY_ELEMENTS.length);
                const COUNT_ELEMENTS_COLUMN = countColumns(GROUP_EMPTY_ELEMENTS);
                this.scene.progressBar.updateProgressFillBar(WIN_VALUE / this.scene.config.winningValue);
                this.scene.scoreField.updateScoreField(WIN_VALUE);
                this.scene.headerElements.updateMovesLeft();
                // Изменение положения по Y связанных блоков и задаю случайный цвет блоку
                GROUP_EMPTY_ELEMENTS.forEach(([row, column]) => {
                    const BLOCK = this.parent.arrBlocks[row][column];
                    BLOCK.image.setY(
                        this.config.initialY - (COUNT_ELEMENTS_COLUMN[column]) * (this.config.heigth - this.config.offsetY));
                    BLOCK.setRandomColor();
                    COUNT_ELEMENTS_COLUMN[column]--;
                });
                this._moveElementsByColorUp(this.parent.arrBlocks, GROUP_EMPTY_ELEMENTS);
                const ARR_CHANGED_COLUMNS = Object.keys(COUNT_ELEMENTS_COLUMN).map(Number)

                this.parent.arrBlocks.forEach((row, rowIndex) => row.forEach((block, colIndex) => {
                    block.rowIndex = rowIndex;
                    // Добавил проверку, чтобы не смотреть колонки, в которых не будет изменене положения элементов
                    if (ARR_CHANGED_COLUMNS.includes(colIndex)) {
                        const CURRENT_Y = block.image.y;
                        const UPDATED_Y = this.config.initialY + rowIndex * (this.config.heigth - this.config.offsetY);
                        // Запускаю анимацию падения блоков
                        if(CURRENT_Y !== UPDATED_Y) {
                            block.image.setDepth(this.config.initialDepth - this.parent.config.rows * rowIndex + colIndex);
                            block.startAnimationFallingBlock(block, UPDATED_Y);
                        }
                    }
                }));
            } else {
                this.parent.activeDisableAllBlocks(true);
            }
        });
    }

    /**
     * Метод для обновления всех блоков в общем массиве arrBlocks
     * @private
     * @param {[Phaser.GameObjects]} array - массив с всеми блоками
     * @param {[number]} group - массив с позициями элементов, котороые пропадут
     **/
    _moveElementsByColorUp(array, group) {
        const COLUMN_COUNT = this.parent.config.cols; // Количество колонок
        
        // Перебираем каждую колонку
        for (let col = 0; col < COLUMN_COUNT; col++) {
            const MATCHING_ELEMENTS = [];
            const REMAINING_ELEMENTS = [];
            
            // Сначала собираем элементы из текущей колонки
            for (let row = 0; row < array.length; row++) {
                const ITEM = array[row][col];

                group.some(([gRow, gCol]) => gRow === row && gCol === col)
                    ? MATCHING_ELEMENTS.push(ITEM)
                    : REMAINING_ELEMENTS.push(ITEM);
            }
    
            // Обновляем индексы и формируем новую колонку
            const UPDATED_COLUMN = [...MATCHING_ELEMENTS, ...REMAINING_ELEMENTS];
    
            // Записываем обновленную колонку обратно в массив
            for (let row = 0; row < array.length; row++) {
                array[row][col] = UPDATED_COLUMN[row];
            }
        }
    
        return array;
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
     **/
    startAnimationFallingBlock(block, y) {
        this.scene.tweens.add({
            targets: block.image,
            y: y,
            duration: 500,
            ease: 'Linear',
            onComplete: (tween) => {
                !this.parent.arrBlocks[0][0].image.input.enabled 
                    && this.parent.activeDisableAllBlocks(true);
                tween.destroy();
            }
        });
    }
}