import { countColumns, findAdjacentGroups , getAllElements, getColorCounts, getElementsInLine, getElementsInTouchRadius, getWinValueByColor, randomIntBetween0And4, refreshBlockPositions, sortByColumnAndRow } from "../functions";
import { Block } from "./Block";
import { MovedImage } from "./MovedImage";

export class BlastField {
    scene;
    config;
    allRows = 0;
    allCols = 0;
    arrBlocks = [];

    constructor(scene, config, allRows, allCols) {
        this.scene = scene;
        this.config = config;
        this.allRows = allRows;
        this.allCols = allCols;

        this._createElements();
    }

    /**
     * Метод создает элементы класса BlastField
     * @private
     **/
    _createElements() {
        const COLORS = this.scene.config.blockColors;
        this.scene.make.image(this.config.bg);
        this.arrBlocks = Array.from({ length: this.allRows }, (_, y) => 
            Array.from({ length: this.allCols }, (_, i) => 
                new Block(
                    this.scene, 
                    i,
                    y,
                    {
                        ...this.config.block,
                        key: COLORS[randomIntBetween0And4()],
                        x: this.config.block.initialX + i * this.config.block.width,
                        y: this.config.block.initialY + y * (this.config.block.heigth - this.config.block.offsetY),
                        depth: this.config.block.initialDepth - this.allCols * y + i,
                    },
                    this
                )
            )
        );
    }

    /**
     * Метод для отключения/включения всех кнопок
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    activeDisableAllBlocks(state) {
        this.arrBlocks.forEach(row => row.forEach(block => state
            ? block.image.setInteractive({cursor: "pointer"})
            : block.image.disableInteractive()
        ));
    }

    /**
     * Метод для задания случайного цвета всем блокам
     * @public
     * @param {boolean} isBtnClick - был ли клик по кнпоке перемешать
     **/
    mixingBlocksColor(isBtnClick = false) {
        this.arrBlocks.forEach(row => row.forEach(block => block.setRandomColor()));
        isBtnClick && this.scene.checkPosibilityToContinueGame();
    }

    /**
     * Метод для обработки клика на блок и последующего запуска каскада функций c анимацией падения блоков
     * @public
     * @param {number} rowIndex - номер сторки
     * @param {number} colIndex - номер столбца
     * @param {string} color - цвет блока
     * @param {boolean} isSuperBonus - супер бонус
     **/
    handleBlockClick(rowIndex, colIndex, color, isSuperBonus) {
        let groupEmptyElements = [];
        this.activeDisableAllBlocks(false);
        const ACTIVE_BONUS = this._getInvisibleElements(rowIndex, colIndex, color, isSuperBonus, groupEmptyElements);
        if (groupEmptyElements.length >= 2) {
            this._updateScoreAndHeaderValues(groupEmptyElements, ACTIVE_BONUS, color);
            this._updateBlockPositionsAndAnimate(groupEmptyElements, rowIndex, colIndex, isSuperBonus);
        } else {
            this.activeDisableAllBlocks(true);
        }
    }

    /**
     * Метод для просчёта положения элементов и последующего запуска анимации падения блоков
     * @private
     * @param {[number]} group - массив с позициями пустых ячеек
     * @param {number} rowIndex - номер сторки элемента, по которому был клик
     * @param {number} colIndex - номер столбца элемента, по которому был клик
     **/
    _updateBlockPositionsAndAnimate(group, clickRowIndex, clickColIndex, isSuperBonus) {
        const CONFIG = this.config.block;
        // Сортирую массив, чтобы блоки правильно занимали позиции после поднятия вверх
        sortByColumnAndRow(group);
        const BONUSES = this._checkColorsForBonuses(getColorCounts(group));
        if (!isSuperBonus && BONUSES.count !== 0) {
            const COPPY_GROUP = [...group];
            const MOVED_TO_BONUS_LINE_GROUP = [];
            BONUSES.colors.forEach(color => {
                const ELEMENT = COPPY_GROUP.find(subArray => subArray[2] === color);
                MOVED_TO_BONUS_LINE_GROUP.push(ELEMENT);
                COPPY_GROUP.splice(COPPY_GROUP.indexOf(ELEMENT), 1);
            });
            this._startAnimationMovingUpBlocks(COPPY_GROUP, false);
            this._startAnimationMovingUpBlocks(MOVED_TO_BONUS_LINE_GROUP, true);
        } else {
            this._startAnimationMovingUpBlocks(group, false);
        }
        const COUNT_ELEMENTS_COLUMN = countColumns(group);
        // Изменение положения по Y связанных блоков и задаю случайный цвет блоку
        group.forEach(([row, column]) => {
            const BLOCK = this.arrBlocks[row][column];
            BLOCK.setY(
                CONFIG.initialY - COUNT_ELEMENTS_COLUMN[column] * (CONFIG.heigth - CONFIG.offsetY));
            BLOCK.setRandomColor();
            COUNT_ELEMENTS_COLUMN[column]--;
        });
        refreshBlockPositions(this.arrBlocks, group, this.allCols);
        const ARR_CHANGED_COLUMNS = Object.keys(COUNT_ELEMENTS_COLUMN).map(Number);
        !isSuperBonus && BONUSES.superBonus && this.arrBlocks[clickRowIndex][clickColIndex].showHideText(true);
        this.arrBlocks.forEach((row, rowIndex) => row.forEach((block, colIndex) => {
            block.rowIndex = rowIndex;
            // Добавил проверку, чтобы не смотреть колонки, в которых не будет изменене положения элементов
            if (ARR_CHANGED_COLUMNS.includes(colIndex)) {
                const CURRENT_Y = block.image.y;
                const UPDATED_Y = CONFIG.initialY + rowIndex * (CONFIG.heigth - CONFIG.offsetY);
                // Запускаю анимацию падения блоков
                if(CURRENT_Y !== UPDATED_Y) {
                    block.setDepth(CONFIG.initialDepth - this.allRows * rowIndex + colIndex);
                    block.startAnimationFallingBlock(UPDATED_Y);
                }
            }
        }));
    }

    /**
     * Метод для обновления всех значений header, scoreField и количества бонусов
     * @private
     * @param {[number]} group - массив с позициями пустых ячеек
     * @param {boolean} isActiveBonus - был ли активирован бонус
     * @param {boolean} color - цвет ячейки, по которой был клик
     **/
    _updateScoreAndHeaderValues(group, isActiveBonus, color) {
        let winValue = 0;
        isActiveBonus 
            ? group.forEach(block => winValue += getWinValueByColor(block[2], 1))
            : winValue = getWinValueByColor(color, group.length);
        this.scene.progressBar.updateProgressFillBar(winValue);
        this.scene.scoreField.updateScoreField(winValue);
        this.scene.updateMovesLeft();
        const CURRENT_REMAINING_POINTS = 
            this.scene.remainingPoints - winValue <= 0 ? 0 : this.scene.remainingPoints - winValue;
        this.scene.updateRemainingPoints(CURRENT_REMAINING_POINTS);
        isActiveBonus && isActiveBonus != 2 
            && this.scene[isActiveBonus === "0" ? "bonusRadius" : "bonusLine"].updateBonusCount();
    }

    /**
     * Метод который создаст копии блоков поверх текущих и запустит анимацию полёта копий вверх или к бонусу с линиями
     * @private
     * @param {[number]} group - массив с позициями элементов, котороые пропадут
     * @param {boolean} isMovedToBonusLine - символы должны лететь к бонусу с линиями
     **/
    _startAnimationMovingUpBlocks(arr, isMovedToBonusLine) {
        const CONFIG = this.config.coppyBlock;
        arr.forEach(block => {
            const ORIGINAL = this.arrBlocks[block[0]][block[1]].image;
            const COPPY = new MovedImage(
                this.scene, 
                {
                    x: ORIGINAL.x,
                    y: ORIGINAL.y,
                    key: ORIGINAL.texture.key,
                    depth: CONFIG.depth + ORIGINAL.depth,
                    origin: CONFIG.origin
                }, 
            );
            COPPY.startAnimationMovingBlock(
                isMovedToBonusLine ? CONFIG.bonusLineX : CONFIG.x, 
                isMovedToBonusLine ? CONFIG.bonusLineY : CONFIG.y,
                isMovedToBonusLine
            );
        });
    }

    /**
     * Метод который посчитает количество бонусов, которое нужно добавить в зависимости от цвета
     * @private
     * @param {{string}} obj - объект, с количеством цветов элементов
     **/
    _checkColorsForBonuses(obj) {
        const BONUSES = {
            count: 0,
            colors: [],
            superBonus: false
        };
        for (let item in obj) {
            if (obj[item] >= 12) {
                BONUSES.superBonus = true;
            } else if (obj[item] >= 8) {
                BONUSES.count++;
                BONUSES.colors.push(item);
            }
        }
        return BONUSES;
    }

    /**
     * Метод который посчитает количество бонусов, которое нужно добавить в зависимости от цвета
     * @private
     **/
    checkSuperBonusBlock() {
        let isSuperBonus = false;
        this.arrBlocks.forEach((row, rowIndex) => row.forEach((block, colIndex) => {
            if (block.text.visible) {
                isSuperBonus = [rowIndex, colIndex];
            }
        }));
        return isSuperBonus;
    }

    /**
     * Метод для определения положения и цвета всех элементов, которые пропадут в зависимости от выбранного бонуса
     * @private
     * @param {number} rowIndex - номер сторки
     * @param {number} colIndex - номер столбца
     * @param {string} color - цвет блока
     * @param {boolean} isSuperBonus - супер бонус активирован сейчас
     * @param {[number]} groupEmptyElements - массив с позициями пустых ячеек
     **/
    _getInvisibleElements(rowIndex, colIndex, color, isSuperBonus, groupEmptyElements) {
        // Проверка состояния игры на активный бонус
        if (isSuperBonus) {
            this.arrBlocks[rowIndex][colIndex].showHideText(false);
            this.scene.bonusLine.showHideBonus(false);
            this.scene.bonusRadius.showHideBonus(false);
            this.scene.isActiveBonusRadius = false;
            this.scene.isActiveBonusLine = false;
        } else {
            const ARR_BLOCK_HAS_SUPER_BONUS = this.checkSuperBonusBlock();
            ARR_BLOCK_HAS_SUPER_BONUS && this.arrBlocks[ARR_BLOCK_HAS_SUPER_BONUS[0]][ARR_BLOCK_HAS_SUPER_BONUS[1]].showHideText(false);
        }
        const ACTIVE_BONUS = isSuperBonus ? "2" : this.scene.getActiveBonus(); 
        // Определяем положение и цвет всех элементов, которые пропадут в зависимости от выбранного бонуса
        switch(ACTIVE_BONUS) {
            case '0':
                getElementsInTouchRadius(
                    rowIndex, 
                    colIndex, 
                    this.allRows, 
                    this.allCols,
                    this.scene.radiusBlast,
                    groupEmptyElements,
                    this.arrBlocks
                );
                break;
            case '1': 
                getElementsInLine(
                    rowIndex,
                    this.allCols,
                    groupEmptyElements,
                    this.arrBlocks
                );
                break;
            case '2':
                getAllElements(
                    groupEmptyElements,
                    this.arrBlocks
                );
                break;
            default:
                const VISITED = Array.from({ length: this.allRows }, () => Array(this.allCols).fill(false));
                findAdjacentGroups (rowIndex, colIndex, color, VISITED, groupEmptyElements, this.arrBlocks);
                break;
        }
        return ACTIVE_BONUS;
    }
}