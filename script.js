const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.getElementById('winningMessageText');
const winningMessageButton = document.getElementById('winningMessageButton');
let isXTurn = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);
winningMessageButton.addEventListener('click', startGame);

function startGame() {
    isXTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.textContent = ""; // Clear text content for each cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessageElement.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase(); // Add "X" or "O" as text content
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${isXTurn ? 'X' : 'O'} Wins!`;
    }
    winningMessageElement.style.display = 'flex';
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}
