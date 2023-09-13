const gameBoard = (() => { 
    let board = new Array(9);

    const updateBoard = (num, player) =>{
        const htmlField = document.querySelector(`.board button:nth-child(${num + 1})`);
        htmlField.textContent = player.getSign();
        board[num] = player.getSign();
    };

    const getValue = (num) => {
        return board[num];
    };

    const clear = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = undefined
        };
    };

    return {updateBoard, getValue, clear}
})();

const Player = (sign, name) => {
    
    name = name

    let _sign = sign
    const getSign = () =>{
        return _sign
    };

    return {getSign, name}
};

const gameController = (() => {
    const _squares = document.querySelectorAll(".square")

    const player1 = Player("X", "player1");
    const player2 = Player("O", "player2");
    let currentPlayer = player1

    const reset = () => {
        currentPlayer = player1;
    };
    
    const _switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        return currentPlayer
    };
    
    const setValue = (num) =>{
        if(gameBoard.getValue(num) === undefined){
            gameBoard.updateBoard(num, currentPlayer);
            
            if(checkWinner(gameBoard)){
                displayController.displayWinner(currentPlayer);
                return
            }

            if(checkTie(gameBoard)){
                displayController.displayTie();
                return
            }

            _switchPlayer();
        }
    };

    const checkRows = (board) => {
        for(let i = 0; i < 3; i++){
            let row = []
            for(let j = i*3; j < i*3 + 3; j++){
                row.push(board.getValue(j));
            }

            const allXs = row.every((value) => value === "X");
            const allOs = row.every((value) => value === "O")
            
            if (allXs || allOs) {
                return true
            }
        };
        return false
    };

    const checkCols = (board) => {
        for(let i = 0; i < 3; i++){
            let col = []
            for(let j = 0; j < 3; j++){
                col.push(board.getValue(i+3*j));
            }

            const allXs = col.every((value) => value === "X");
            const allOs = col.every((value) => value === "O")
            
            if (allXs || allOs) {
                return true
            }
        };
        return false
    };

    const checkDiagonal = (board) => {
        let diagonal1 = [board.getValue[0], board.getValue[4], board.getValue[8]];
        let diagonal2 = [board.getValue[2], board.getValue[4], board.getValue[6]];

        if (diagonal1.every((value) => value === "X") || diagonal1.every((value) => value === "O")){
            return true
        } else if (diagonal2.every((value) => value === "X") || diagonal2.every((value) => value === "O")){
            return true
        }

        return false
    };

    const checkWinner = (board) => {
        return (checkCols(board) || checkDiagonal(board) || checkRows(board))
    };
    
    const checkTie = (board) => {
        for(let i = 0; i < 9; i++){
            if(board.getValue(i) === undefined){
                return false
            }
        };
        return true
    };

    return {setValue, currentPlayer, reset}

})();

const displayController = (() => {
    const _squares = document.querySelectorAll(".square")
    const htmlResults = document.querySelector(".result")
    const resetBtn = document.querySelector(".clear");

    const _init = (() => {
        for(let i = 0; i < _squares.length; i++){
            _squares[i].addEventListener('click', () => gameController.setValue(i))
        }
        resetBtn.addEventListener('click', () => {
            clear();
            gameBoard.clear();
            gameController.reset();
        });
    })();

    const displayWinner = (player) => {
        htmlResults.innerText = `Winner is ${player.name}`
    };

    const displayTie = () => {
        htmlResults.innerText = `It's a draw!`
    };

    const clear = () => {
        _squares.forEach(square => {
            square.innerText = ''
        });
    };

    return {displayWinner, clear, displayTie}
})();



