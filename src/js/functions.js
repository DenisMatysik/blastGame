export const randomIntBetween0And4 = () => {
    return Math.floor(Math.random() * 5);
};

// Алгоритм DFS для поиска группы прилегающих элементов
export function dfs(row, col, value, visited, group, arrBlocks) {
    // Проверка границ и условий
    if (row < 0 || row >= 10 || col < 0 || col >= 9 || visited[row][col] || arrBlocks[row][col].color !== value) {
        return;
    }

    visited[row][col] = true; // Отмечаем ячейку как посещённую
    group.push([row, col]); // Добавляем ячейку в группу

    // Рекурсивно проверяем соседние ячейки (вверх, вниз, влево, вправо)
    dfs(row - 1, col, value, visited, group, arrBlocks); // Вверх
    dfs(row + 1, col, value, visited, group, arrBlocks); // Вниз
    dfs(row, col - 1, value, visited, group, arrBlocks); // Влево
    dfs(row, col + 1, value, visited, group, arrBlocks); // Вправо
}

// Поиск элементов, в определённом радиусе
export const getElementsInTouchRadius = (row, col, allRows, allCols, radius, groupEmptyElements) => {
    for (let i = Math.max(0, row - radius); i <= Math.min(allRows - 1, row + radius); i++) {
        for (let j = Math.max(0, col - radius); j <= Math.min(allCols - 1, col + radius); j++) {
            const DISTANCE = Math.sqrt((i - row) ** 2 + (j - col) ** 2);
            DISTANCE <= radius && groupEmptyElements.push([i, j]);
        }
    }
    return groupEmptyElements;
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

export const getWinValueByColor = (color, count, colorsWin = false) => {
    const valueByColor = {
        "yellow": 1,
        "purple": 2,
        "blue": 3,
        "green": 4,
        "red": 5,
    };

    if (colorsWin) {
        let win = 0;
        for (const color in colorsWin) {
            const COLOR_VALUE = valueByColor[color];
            win += COLOR_VALUE * colorsWin[color];
        };
        return win
    }

    return count * valueByColor[color];
}