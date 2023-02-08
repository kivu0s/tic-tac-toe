var playerScore1 = 0;
var playerScore2 = 0;

var tapMusic = new Audio("Audios/tap.mp3");
var gameoverMusic = new Audio("Audios/game-over.mp3");
var gametied = new Audio("Audios/game-tied.mp3");

var turn = true;

var btnId = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var grid = new Array(3);
for (var i = 0; i <= grid.length - 1; i++) {
    grid[i] = new Array(3);
}

for (var i = 0; i <= grid.length - 1; i++)
    for (var j = 0; j <= grid.length - 1; j++)
        grid[i][j] = 100;

function checkWin() {
    let unfilled = false;
    for (var i = 0; i <= grid.length - 1; i++)
        for (var j = 0; j <= grid.length - 1; j++)
            if (grid[i][j] == 100) {
                unfilled = true;
                break;
            }
    if ((grid[0][0] == 0 && grid[0][1] == 0 && grid[0][2] == 0) || (grid[1][0] == 0 && grid[1][1] == 0 && grid[1][2] == 0) || (grid[2][0] == 0 && grid[2][1] == 0 && grid[2][2] == 0) || (grid[0][0] == 0 && grid[1][0] == 0 && grid[2][0] == 0) || (grid[0][1] == 0 && grid[1][1] == 0 && grid[2][1] == 0) || (grid[0][2] == 0 && grid[1][2] == 0 && grid[2][2] == 0) || (grid[0][0] == 0 && grid[1][1] == 0 && grid[2][2] == 0) || (grid[0][2] == 0 && grid[1][1] == 0 && grid[2][0] == 0))
        return 0;
    else if ((grid[0][0] == 1 && grid[0][1] == 1 && grid[0][2] == 1) || (grid[1][0] == 1 && grid[1][1] == 1 && grid[1][2] == 1) || (grid[2][0] == 1 && grid[2][1] == 1 && grid[2][2] == 1) || (grid[0][0] == 1 && grid[1][0] == 1 && grid[2][0] == 1) || (grid[0][1] == 1 && grid[1][1] == 1 && grid[2][1] == 1) || (grid[0][2] == 1 && grid[1][2] == 1 && grid[2][2] == 1) || (grid[0][0] == 1 && grid[1][1] == 1 && grid[2][2] == 1) || (grid[0][2] == 1 && grid[1][1] == 1 && grid[2][0] == 1))
        return 1;
    else if (!unfilled)
        return 2;
    else
        return 3;
}

function ticTacToe(buttonId) {
    tapMusic.play();
    if (turn == true) {
        document.getElementById(`btn${buttonId}`).innerText = "×";
        document.getElementById(`btn${buttonId}`).classList.add('btntext1');
        document.getElementById(btnId[buttonId - 1]).disabled = true;
        document.getElementById(btnId[buttonId - 1]).classList.toggle('btn-hover3');
        grid[Math.floor((buttonId - 1) / 3)][(buttonId - 1) % 3] = 1;

        for (var i = 0; i < 9; i++) {
            document.getElementById(btnId[i]).classList.remove('btn-hover1');
            document.getElementById(btnId[i]).classList.add('btn-hover2');
        }

        turn = false;
    }
    else {
        document.getElementById(`btn${buttonId}`).innerText = "○";
        document.getElementById(`btn${buttonId}`).classList.add('btntext2');
        document.getElementById(btnId[buttonId - 1]).disabled = true;
        document.getElementById(btnId[buttonId - 1]).classList.toggle('btn-hover3');
        grid[Math.floor((buttonId - 1) / 3)][(buttonId - 1) % 3] = 0;

        for (var i = 0; i < 9; i++) {
            document.getElementById(btnId[i]).classList.remove('btn-hover2');
            document.getElementById(btnId[i]).classList.add('btn-hover1');
        }

        turn = true;
    }

    if (checkWin() == 0 || checkWin() == 1)
        for (var i = 0; i < 9; i++)
            document.getElementById(btnId[i]).disabled = true;

    if (checkWin() == 0) {
        playerScore2 += 1;
        document.getElementById('result').innerText = "Player 2(○) Won";
        document.getElementById('player2-score').innerHTML = "Player 2(○) <br> " + playerScore2;
        document.getElementById('container').classList.add('fade-out');
        document.getElementById('result-reset').style.display = "block";
        gameoverMusic.play();
    }
    else if (checkWin() == 1) {
        playerScore1 += 1;
        document.getElementById('result').innerText = "Player 1(×) Won";
        document.getElementById('player1-score').innerHTML = "Player 1(×) <br> " + playerScore1;
        document.getElementById('container').classList.add('fade-out');
        document.getElementById('result-reset').style.display = "block";
        gameoverMusic.play();
    }
    else if (checkWin() == 2) {
        document.getElementById('result').innerText = "Game Tied!";
        document.getElementById('container').classList.add('fade-out');
        document.getElementById('result-reset').style.display = "block";
        gametied.play();
    }
    else {
        checkTurn();
    }
}

function reset(prompt) {
    for (var i = 0; i <= grid.length - 1; i++)
        for (var j = 0; j <= grid.length - 1; j++)
            grid[i][j] = 100;

    turn = true;

    document.getElementById('container').classList.remove('fade-out');
    document.getElementById('result-reset').style.display = "none";

    for (var i = 0; i < 9; i++) {
        document.getElementById(btnId[i]).classList.remove('btn-hover2');
        document.getElementById(btnId[i]).classList.remove('btn-hover3');
        document.getElementById(btnId[i]).classList.add('btn-hover1');
        document.getElementById(btnId[i]).disabled = false;
        document.getElementById(`btn${i + 1}`).innerText = "";
    }
    flag = true;
    document.getElementById('check').classList.remove('xx');

    if (prompt == 2) {
        playerScore1 = playerScore2 = 0;
        document.getElementById('check').classList.remove('oo');
        document.getElementById('check').classList.remove('xx');
        document.getElementById('player2-score').innerHTML = "Player 2(○) <br> " + playerScore2;
        document.getElementById('player1-score').innerHTML = "Player 1(×) <br> " + playerScore1;
    }
}

let flag = true;
function checkTurn() {
    const checkerDiv = document.getElementById('check');
    checkerDiv.classList.add('oo');
    if (flag) {
        checkerDiv.classList.remove('oo');
        checkerDiv.classList.add('xx');
        flag = false;
    }
    else {
        checkerDiv.classList.remove('xx');
        checkerDiv.classList.add('oo');
        flag = true;
    }
}