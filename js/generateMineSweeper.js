function generateMineSweeper() {
    const SIZE = 20;
    const MINES_COUNT = 10;
    const MINE = '💥';
    const NUMBERS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

    // Initialize a 10x10 grid with zeros
    let grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
        let row = Math.floor(Math.random() * SIZE);
        let col = Math.floor(Math.random() * SIZE);
        if (grid[row][col] !== MINE) {
            grid[row][col] = MINE;
            minesPlaced++;
        }
    }

    // Function to check if a cell is within grid bounds
    function isInBounds(x, y) {
        return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
    }

    // Calculate numbers for each cell
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (grid[row][col] === MINE) continue;
            let minesCount = 0;
            // Check all adjacent cells
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    let newRow = row + x;
                    let newCol = col + y;
                    if (isInBounds(newRow, newCol) && grid[newRow][newCol] === MINE) {
                        minesCount++;
                    }
                }
            }
            grid[row][col] = NUMBERS[minesCount];
        }
    }

    return grid;
}

// Example of displaying the grid
function displayGrid(grid) {
    let dis = '';
    for (let row of grid) {
        dis += `||${row.join('||||')}||\n`; // || tile || for discord spoiler feature
    }
    return dis;
}

const minesweeper = displayGrid(generateMineSweeper());
console.log(minesweeper);
