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