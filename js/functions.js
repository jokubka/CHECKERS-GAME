'use strict';

//////////////////////////////////////////////
//
//Board rendering function
//
//////////////////////////////////////////////
function generateBoard(width, height) {
    var HTML = "",
        widthPercent = 100 / width + '%',
        heightPercent = 100 / height + '%';

    // Rendering rows
    for (var row = 0; row < height; row++) {
        HTML += `<div class="row" style="height: ${heightPercent}">`;

        //Rendering cells
        for (var col = 0; col < width; col++){

            // Checking row step number
            if (row%2 === 0){
                if (col%2 === 0){
                    HTML += `<div class="white cell" style="width: ${widthPercent}"><div class="col-coords"> ${col.toString() + row}</div></div>`;
                } else {
                    HTML += `<div class="black cell" style="width: ${widthPercent}"><div class="col-coords"> ${col.toString() + row}</div></div>`;
                }
            } else {
                if (col%2 === 0) {
                    HTML += `<div class="black cell" style="width: ${widthPercent}"><div class="col-coords"> ${col.toString() + row}</div></div>`;
                } else {
                    HTML += `<div class="white cell" style="width: ${widthPercent}"><div class="col-coords"> ${col.toString() + row}</div></div>`;
                }
            }

        }
        HTML += '</div>';
    }

    return HTML;
}

// Rendering outside cells with letters

function generateLetters(width) {
    var HTML = '',
        widthPercent = 100 / width + '%',
        letters = 'abcdefgh';

    for (var i = 0; i < width; i++) {
        HTML += `<div style="width: ${widthPercent}"> ${letters[i]}</div>`;
    }
    return HTML;

}

// Rendering outside cells with numbers

function generateNumbers(height){
    var HTML = '',
        heightPercent = 100 / height + '%';

    for (var i = height; i >= 1; i--) {
        HTML += `<div style="height: ${heightPercent}"><span> ${i} </span></div>`;
    }


    return HTML;
}

//////////////////////////////////////
//
//Checkers rendering function
//
/////////////////////////////////////
function generateCheckers(){
    var HTML = '',
        x = 0,
        y = 0;

    //Rendering Home position of WHITE checkers
    for (var i = 0; i < home_pos_white.length; i++) {
        x = home_pos_white[i].x;
        y = home_pos_white[i].y;

        HTML += `<div class="white-checker" style="left: calc(12.5% * ${x}); top: calc(12.5% * ${y});"><span> ${i} </span></div>`
    }

    //Rendering Home position of BLACK checkers
    for (var i = 0; i < home_pos_black.length; i++) {
        x = home_pos_black[i].x;
        y = home_pos_black[i].y;

        HTML += `<div class="black-checker" style="left: calc(12.5% * ${x}); top: calc(12.5% * ${y});"><span> ${i} </span></div>`;
    }
    return HTML;
}

///////////////////////////////////////////
//
//Rendering chekers for starting positions
//
//////////////////////////////////////////
function generateStartPosition(){
    var x = 0,
        y = 0,
        white_checker = document.querySelectorAll('.white-checker'),
        black_checker = document.querySelectorAll('.black-checker');


    //WHITE checkers
    for (var i = 0; i < white_checker.length; i++) {
        x = start_pos_white[i].x;
        y = start_pos_white[i].y;
console.log(i, x, y, ' white');
console.log("-------------");
        white_checker[i].style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;
    }

    //BLACK checkers
    for (var i = 0; i < black_checker.length; i++) {
        x = start_pos_black[i].x;
        y = start_pos_black[i].y;
        console.log(i, x, y, ' black');
        console.log("-------------");

        black_checker[i].style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;
    }

    document.querySelector('.btn-game').innerHTML = 'new game';

}


////////////////////////////////////////////////////
//
//Function for finding and showing available moves
//
////////////////////////////////////////////////////
function moveSelector(e){
    var white_checker = document.querySelectorAll('.white-checker'),
        black_checker = document.querySelectorAll('.black-checker'),
        active_checker = '',
        black_cell = document.querySelectorAll('.black'),
        checker_number = e.target.innerText;

     ////////////////////////////
    //Team WHITE available moves
    /////////////////////////////
    if (turn_white && e.target.classList.contains('white-checker')){
        var current_x = current_pos_white[checker_number].x,
            current_y = current_pos_white[checker_number].y,
            coords = 0,
            new_x = 0,
            new_y = 0,
            kill_x = 0,
            kill_y = 0;

        for (var i = 0; i < white_checker.length; i++){
            white_checker[i].classList.remove('active-checker');
            black_checker[i].classList.remove('kill-checker');
            white_checker[i].classList.remove('kill-checker');
        };

        for (var i = 0; i < black_cell.length; i++){
            black_cell[i].classList.remove('active-cell');
        };

        if (e.target.classList.contains('white-checker')){
            e.target.classList.add('active-checker');
        }

        active_checker = document.querySelector('.active-checker');

        ///////////////////////
        //Queen available moves
        ///////////////////////
        if (active_checker.classList.contains('white-queen')){
            //Queen up and left
            queenUpLeft(current_x, current_y, black_cell);

            //Queen up and right
            queenUpRight(current_x, current_y, black_cell);

            //Queen down and left
            queenDownLeft(current_x, current_y, black_cell);

            //Queen down and right
            queenDownRight(current_x, current_y, black_cell);

        }



        //Available moves to the left
        new_x = current_x - 1;
        new_y = current_y - 1;
        coords = new_x.toString() + new_y.toString();

        if (!positionChecker(new_x, new_y, 'white') && !positionChecker(new_x, new_y, 'black')){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available moves to the right
        new_x = current_x + 1;
        new_y = current_y - 1;
        coords = new_x.toString() + new_y.toString();

        if (!positionChecker(new_x, new_y, 'white') && !positionChecker(new_x, new_y, 'black')){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }


        // //Available kills
        if (killAllowedBlack(current_x, current_y)) {
            console.log(kill_object);

            for (var i = 0; i < black_cell.length; i++){
                for (var n = 0; n < kill_object.length; n++){
                    if (black_cell[i].innerText == kill_object[n].move_to_coords){
                        black_cell[i].classList.add('active-cell');
                    }
                }
            }
            for (var i = 0; i < current_pos_black.length; i++){
                for (var n = 0; n < kill_object.length; n++){
                    if ( current_pos_black[i].x == kill_object[n].x && current_pos_black[i].y == kill_object[n].y){
                        black_checker[i].classList.add('kill-checker');
                    }
                }
            }
        }

    }


    ////////////////////////////
   //Team BLACK available moves
   /////////////////////////////
    if (turn_black && e.target.classList.contains('black-checker')){
        var current_x = current_pos_black[checker_number].x;
            current_y = current_pos_black[checker_number].y,
            coords = 0,
            new_x = 0,
            new_y = 0;

        for (var i = 0; i < black_checker.length; i++){
            black_checker[i].classList.remove('active-checker');
            white_checker[i].classList.remove('kill-checker');
            black_checker[i].classList.remove('kill-checker');
        };

        for (var i = 0; i < black_cell.length; i++){
            black_cell[i].classList.remove('active-cell');
        };

        if (e.target.classList.contains('black-checker')){
            e.target.classList.add('active-checker');
        }

        active_checker = document.querySelector('.active-checker');

        ///////////////////////
        //Queen available moves
        ///////////////////////
        if (active_checker.classList.contains('black-queen')){
            //Queen up and left
            queenUpLeft(current_x, current_y, black_cell);

            //Queen up and right
            queenUpRight(current_x, current_y, black_cell);

            //Queen down and left
            queenDownLeft(current_x, current_y, black_cell);

            //Queen down and right
            queenDownRight(current_x, current_y, black_cell);

        }

        //Available moves to the left
        new_x = current_x - 1;
        new_y = current_y + 1;
        coords = new_x.toString() + new_y.toString();

        if (!positionChecker(new_x, new_y, 'white') && !positionChecker(new_x, new_y, 'black')){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available moves to the right
        new_x = current_x + 1;
        new_y = current_y + 1;
        coords = new_x.toString() + new_y.toString();

        if (!positionChecker(new_x, new_y, 'white') && !positionChecker(new_x, new_y, 'black')){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available kills
        if (killAllowedWhite(current_x, current_y)) {
            console.log(kill_object);
            for (var i = 0; i < black_cell.length; i++){
                for (var n = 0; n < kill_object.length; n++){
                    if (black_cell[i].innerText == kill_object[n].move_to_coords){
                        black_cell[i].classList.add('active-cell');
                    }
                }
            }
            for (var i = 0; i < current_pos_white.length; i++){
                for (var n = 0; n < kill_object.length; n++){
                    if ( current_pos_white[i].x == kill_object[n].x && current_pos_white[i].y == kill_object[n].y){
                        white_checker[i].classList.add('kill-checker');
                    }
                }
            }
        }

    }
}
//Function position checker
function positionChecker(x, y, team_color){
    if ( team_color === 'white'){
        for (var i = 0; i < current_pos_white.length; i++){
            if (current_pos_white[i].x === x && current_pos_white[i].y === y){
                return true;
            }
        }
        return false;
    }
    if ( team_color === 'black'){
        for (var i = 0; i < current_pos_white.length; i++){
            if (current_pos_black[i].x === x && current_pos_black[i].y === y){
                return true;
            }
        }
        return false;
    }
}
////////////////////////////////////
//Functions for queen positions
///////////////////////////////////
function queenUpLeft(x, y, black_cell){
    for (var i = 0; i <= 8; i++){
        if (x > 0 && y > 0) {
            x--;
            y--;
            if(!positionChecker(x, y, 'white') && !positionChecker(x, y, 'black')){
                for (var n = 0; n < black_cell.length; n++){
                    if (black_cell[n].innerText == x.toString() + y.toString()){
                        black_cell[n].classList.add('active-cell');
                    }
                }

            } else {
                return;
            }
        }
    }
}

function queenUpRight(x, y, black_cell){
    for (var i = 0; i <= 8; i++){
        if (x > 0 && y > 0) {
            x++;
            y--;
            if(!positionChecker(x, y, 'white') && !positionChecker(x, y, 'black')){
                for (var n = 0; n < black_cell.length; n++){
                    if (black_cell[n].innerText == x.toString() + y.toString()){
                        black_cell[n].classList.add('active-cell');
                    }
                }

            } else {
                return;
            }
        }
    }
}

function queenDownLeft(x, y, black_cell){
    for (var i = 0; i <= 8; i++){
        if (x > 0 && y < 7) {
            x--;
            y++;
            if(!positionChecker(x, y, 'white') && !positionChecker(x, y, 'black')){
                console.log('downleft');
                console.log(black_cell);
                for (var n = 0; n < black_cell.length; n++){
                    if (black_cell[n].innerText == x.toString() + y.toString()){
                        black_cell[n].classList.add('active-cell');
                    }
                }

            } else {
                return;
            }
        }
    }
}

function queenDownRight(x, y, black_cell){
    for (var i = 0; i < 8; i++){
        if (x < 7 && y < 7) {
            console.log(x,y);
            x++;
            y++;
            if(!positionChecker(x, y, 'white') && !positionChecker(x, y, 'black')){
                console.log('downright');
                for (var n = 0; n < black_cell.length; n++){
                    if (black_cell[n].innerText == x.toString() + y.toString()){
                        black_cell[n].classList.add('active-cell');
                    }
                }

                console.log(x,y);
            } else {
                return;
            }
        }
    }
}


//Function to find available kills - (to kill BLACK checkers)
function killAllowedBlack (x,y){
    kill_object.length = 0;
    for (var i = 0; i < 3; i++){
        if (positionChecker(x + 1, y - 1, 'black') && x + 2 <= 7 && y - 2 >= 0 ){
            if (!positionChecker(x + 2, y - 2, 'white') && !positionChecker(x + 2, y - 2, 'black')) {
                kill_object.push(
                {
                    x: x + 1,
                    y: y - 1,
                    move_to_coords: (x + 2).toString() + (y - 2).toString()
                });
                x += 2;
                y -= 2;
            };
        };
        if (positionChecker(x - 1, y - 1, 'black') && x - 2 >= 0 && y - 2 >= 0){
            if (!positionChecker(x - 2, y - 2, 'white') && !positionChecker(x - 2, y - 2, 'black')) {
                kill_object.push(
                {
                    x: x - 1,
                    y: y - 1,
                    move_to_coords: (x - 2).toString() + (y - 2).toString()
                });
                x = x - 2;
                y = y - 2;
            };
        };
    };
    if (kill_object.length > 0){
        return true;
    }
}

//Function to find available kills - (to kill WHITE checkers)
function killAllowedWhite (x,y){
    kill_object.length = 0;
    for( var i = 1; i <= 3; i++){
        if (positionChecker(x + 1, y + 1, 'white') && x + 2 <= 7 && y + 2 <= 7) {
            if (!positionChecker(x + 2, y + 2, 'white') && !positionChecker(x + 2, y + 2, 'black')) {
                kill_object.push(
                {
                    x: x + 1,
                    y: y + 1,
                    move_to_coords: (x + 2).toString() + (y + 2).toString()
                });
                x += 2;
                y += 2;
            };
        };
        if (positionChecker(x - 1, y + 1, 'white') && x - 2 >= 0 && y + 2 <= 7) {
            if (!positionChecker(x - 2, y + 2, 'white') && !positionChecker(x - 2, y + 2, 'black')) {
                kill_object.push(
                {
                    x: x - 1,
                    y: y + 1,
                    move_to_coords: (x - 2).toString() + (y + 2).toString()
                });
                x -= 2;
                y += 2;
            };
        };
    };
    if (kill_object.length > 0){
        return true;
    };
};



////////////////////////////////////////////////////////
//
//Function for moving checkers across the Board
//
////////////////////////////////////////////////////////
function makingMove(e){
    var cell_coords = e.target.innerText,
        x = cell_coords[0],
        y = cell_coords[1],
        active_checker = document.querySelector('.active-checker'),
        white_checker = document.querySelectorAll('.white-checker'),
        black_checker = document.querySelectorAll('.black-checker'),
        kill_checker = document.querySelectorAll('.kill-checker'),
        cell = document.querySelectorAll('.cell'),
        cheker_number = active_checker.innerText;


    //New position of the checker - Team WHITE
    if (active_checker.classList.contains('white-checker')){

        active_checker.style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;

        if (kill_checker.length > 0){
            for (var i = 0; i < kill_checker.length; i++){
                var kill_checker_nr = parseInt(kill_checker[i].innerText),
                    x_home = home_pos_black[kill_checker_nr].x,
                    y_home = home_pos_black[kill_checker_nr].y;

                    kill_checker[i].style = `left: calc(12.5% * ${x_home}); top: calc(12.5% * ${y_home}); transition: 1.5s;`;
                    current_pos_black[kill_checker_nr].x = '';
                    current_pos_black[kill_checker_nr].y = '';
            }
        }
        //Add queen status
        if (y == 0) {
            active_checker.classList.add('white-queen');
        }

        current_pos_white[cheker_number].x = parseInt(x);
        current_pos_white[cheker_number].y = parseInt(y);
        turn_white = false;
        turn_black = true;

        for (var i = 0; i < white_checker.length; i++ ) {
            white_checker[i].classList.remove('active-checker');
        }

        for (var i = 0; i < cell.length; i++){
            cell[i].classList.remove('active-cell');
        }

        for (var i = 0; i < white_checker.length; i++){
            white_checker[i].classList.add('reverse-checker')
        }
        for (var i = 0; i < black_checker.length; i++){
            black_checker[i].classList.add('reverse-checker')
        }

        document.querySelector('.game').classList.add('reverse')
    }

    //New position of the checker - Team BLACK
    if (active_checker.classList.contains('black-checker')){

        active_checker.style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;

        if (kill_checker.length > 0){
            for (var i = 0; i < kill_checker.length; i++){
                var kill_checker_nr = parseInt(kill_checker[i].innerText);
                    x_home = home_pos_white[kill_checker_nr].x;
                    y_home = home_pos_white[kill_checker_nr].y;
                    kill_checker[i].style = `left: calc(12.5% * ${x_home}); top: calc(12.5% * ${y_home}); transition: 1.5s;`;
                    current_pos_white[kill_checker_nr].x = '';
                    current_pos_white[kill_checker_nr].y = '';
            }
        }
        //Add queen status
        if (y == 7) {
            active_checker.classList.add('black-queen');
        }

        current_pos_black[cheker_number].x = parseInt(x);
        current_pos_black[cheker_number].y = parseInt(y);
        turn_white = true;
        turn_black = false;

        for (var i = 0; i < black_checker.length; i++ ) {
            black_checker[i].classList.remove('active-checker');
        }

        for (var i = 0; i < cell.length; i++){
            cell[i].classList.remove('active-cell');
        }

        for (var i = 0; i < white_checker.length; i++){
            white_checker[i].classList.remove('reverse-checker')
        }
        for (var i = 0; i < black_checker.length; i++){
            black_checker[i].classList.remove('reverse-checker')
        }

        document.querySelector('.game').classList.remove('reverse')
    }

}
