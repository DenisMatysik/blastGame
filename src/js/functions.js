export const randomIntBetween0And4 = () => {
    return Math.floor(Math.random() * 5);
};

// Поиск группы прилегающих элементов по цвету в двумерном массиве arrBlocks (алгоритм DFS)
export function findAdjacentGroups (row, col, color, visited, group, arrBlocks) {
    // Проверка границ и условий
    if (row < 0 || row >= 10 || col < 0 || col >= 9 || visited[row][col] || arrBlocks[row][col].color !== color) {
        return;
    }

    visited[row][col] = true; // Отмечаем ячейку как посещённую
    group.push([row, col, color]); // Добавляем ячейку в группу

    // Рекурсивно проверяем соседние ячейки (вверх, вниз, влево, вправо)
    findAdjacentGroups (row - 1, col, color, visited, group, arrBlocks); // Вверх
    findAdjacentGroups (row + 1, col, color, visited, group, arrBlocks); // Вниз
    findAdjacentGroups (row, col - 1, color, visited, group, arrBlocks); // Влево
    findAdjacentGroups (row, col + 1, color, visited, group, arrBlocks); // Вправо
}

// Поиск элементов, в определённом радиусе
export const getElementsInTouchRadius = (row, col, allRows, allCols, radius, groupEmptyElements, arrBlocks) => {
    for (let i = Math.max(0, row - radius); i <= Math.min(allRows - 1, row + radius); i++) {
        for (let j = Math.max(0, col - radius); j <= Math.min(allCols - 1, col + radius); j++) {
            const DISTANCE = Math.sqrt((i - row) ** 2 + (j - col) ** 2);
            DISTANCE <= radius && groupEmptyElements.push([i, j, arrBlocks[i][j].color]);
        }
    }
}

// Поиск элементов, в линии
export const getElementsInLine = (row, colIndex, groupEmptyElements, arrBlocks) => {
    for (let i = 0; i < colIndex; i++) {
        groupEmptyElements.push([row, i, arrBlocks[row][i].color]);
    }
}

// Поиск всех элементов на поле
export const getAllElements = (groupEmptyElements, arrBlocks) => {
    arrBlocks.forEach((row, rowIndex) => row.forEach((block, colIndex) => groupEmptyElements.push([rowIndex, colIndex, block.color])))
}

export const sortByColumnAndRow = (arr) => {
    return arr.sort((a, b) => {
        // Сравниваем по второму элементу (столбцу)
        if (a[1] === b[1]) {
            // Если столбцы равны, сравниваем по первому элементу (строке)
            return a[0] - b[0];
        }
        return a[1] - b[1]; // Сравнение по столбцам
    });
}

export const countColumns = (arr) => {
    const COLUMN_COUNT = {};

    arr.forEach(([_, col]) => {
        COLUMN_COUNT[col]
            ? COLUMN_COUNT[col] += 1
            : COLUMN_COUNT[col] = 1;
    });

    return COLUMN_COUNT;
}

export const getWinValueByColor = (color, count) => {
    const valueByColor = {
        "yellow": 1,
        "purple": 2,
        "blue": 3,
        "green": 4,
        "red": 5,
    };

    return count * valueByColor[color];
}

// Поиск хотябы одной пары соседних цветов
export function checkForAdjacentColorPairs (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            // Проверка по горизонтали
            if (j < matrix[i].length - 1 && matrix[i][j].color === matrix[i][j + 1].color) {
                return true; // Найдена пара по цвету
            }
            // Проверка по вертикали
            if (i < matrix.length - 1 && matrix[i][j].color === matrix[i + 1][j].color) {
                return true; // Найдена пара по цвету
            }
        }
    }
    return false; // Пары не найдены
}

// Метод для обновления положения всех блоков в общем массиве arrBlocks, после того как элементы поднялись вверх
export const refreshBlockPositions = (array, group, allCols) => {
    const COLUMN_COUNT = allCols; // Количество колонок
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
}

// Метод для обновления положения всех блоков в общем массиве arrBlocks, после того как элементы поднялись вверх
export const getColorCounts = (group) => {
    return group.reduce((acc, curr) => {
        if (curr[2]) {
            const color = curr[2];
            acc[color] = (acc[color] || 0) + 1;
        }
        return acc;
    }, {});
};