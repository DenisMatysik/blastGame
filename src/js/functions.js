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