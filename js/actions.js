'use strict';


//Board rendering
document.querySelector('.chess-board').innerHTML = generateBoard(width, height);
document.querySelectorAll('.letters')[0].innerHTML = generateLetters(width);
document.querySelectorAll('.letters')[1].innerHTML = generateLetters(width);
document.querySelectorAll('.numbers')[0].innerHTML = generateNumbers(height);
document.querySelectorAll('.numbers')[1].innerHTML = generateNumbers(height);

//Checkers rendering
document.querySelector('.chess-board').innerHTML += generateCheckers();
document.querySelector('.btn-game').addEventListener('click',generateStartPosition);

//Gameplay actions
document.querySelector('.chess-board').addEventListener('click', function(e){
    if (e.target.classList.contains('white-checker')){
        moveSelector(e);
    }
    if (e.target.classList.contains('black-checker')){
        moveSelector(e);
    }
    if (e.target.classList.contains('active-cell')) {
        makingMove(e);
    }
});
