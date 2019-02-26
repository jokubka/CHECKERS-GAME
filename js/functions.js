'use-strict'

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
        y = 0;
        white_checker = document.querySelectorAll('.white-checker'),
        black_checker = document.querySelectorAll('.black-checker');


    //WHITE checkers
    for (var i = 0; i < white_checker.length; i++) {
        x = start_pos_white[i].x;
        y = start_pos_white[i].y;

        white_checker[i].style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;
    }

    //BLACK checkers
    for (var i = 0; i < black_checker.length; i++) {
        x = start_pos_black[i].x;
        y = start_pos_black[i].y;

        black_checker[i].style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`
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
        black_cell = document.querySelectorAll('.black'),
        checker_number = e.target.innerText;

     ////////////////////////////
    //Team WHITE available moves
    /////////////////////////////
    if (turn_white && e.target.classList.contains('white-checker')){
        var x = current_pos_white[checker_number].x;
            y = current_pos_white[checker_number].y,
            coords = 0,
            new_x = 0,
            new_y = 0,
            kill_x = 0,
            kill_y = 0;

        for (var i = 0; i < white_checker.length; i++){
            white_checker[i].classList.remove('active-checker');
            white_checker[i].classList.remove('kill-checker');
        };

        for (var i = 0; i < black_cell.length; i++){
            black_cell[i].classList.remove('active-cell');
        };

        if (e.target.classList.contains('white-checker')){
            e.target.classList.add('active-checker');
        }

        //Available moves to the left
        new_x = x - 1;
        new_y = y - 1;
        coords = new_x.toString() + new_y.toString();

        if (moveAllowed(new_x, new_y,)){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available moves to the right
        new_x = x + 1;
        new_y = y - 1;
        coords = new_x.toString() + new_y.toString();

        if (moveAllowed(new_x, new_y,)){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available kills to the left
        kill_x = x - 1;
        kill_y = y - 1;
        new_x = x - 2;
        new_y = y - 2;
        coords = new_x.toString() + new_y.toString();

        if (killAllowedBlack(kill_x, kill_y, new_x, new_y,)){
            for (var i = 0; i < current_pos_black.length; i++) {
                if (kill_x == current_pos_black[i].x && kill_y == current_pos_black[i].y ){
                    black_checker[i].classList.add('kill-checker');
                }
            }
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available kills to the right
        kill_x = x + 1;
        kill_y = y - 1;
        new_x = x + 2;
        new_y = y - 2;
        coords = new_x.toString() + new_y.toString();

        if (killAllowedBlack(kill_x, kill_y, new_x, new_y,)){
            for (var i = 0; i < current_pos_black.length; i++) {
                if(kill_x == current_pos_black[i].x && kill_y == current_pos_black[i].y ){
                    black_checker[i].classList.add('kill-checker');
                }
            }
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }


    }


    ////////////////////////////
   //Team BLACK available moves
   /////////////////////////////
    if (turn_black && e.target.classList.contains('black-checker')){
        var x = current_pos_black[checker_number].x;
            y = current_pos_black[checker_number].y,
            coords = 0,
            new_x = 0,
            new_y = 0;

        for (var i = 0; i < black_checker.length; i++){
            black_checker[i].classList.remove('active-checker');
            black_checker[i].classList.remove('kill-checker');
        };

        for (var i = 0; i < black_cell.length; i++){
            black_cell[i].classList.remove('active-cell');
        };

        if (e.target.classList.contains('black-checker')){
            e.target.classList.add('active-checker');
        }

        //Available moves to the left
        new_x = x - 1;
        new_y = y + 1;
        coords = new_x.toString() + new_y.toString();

        if (moveAllowed(new_x, new_y,)){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available moves to the right
        new_x = x + 1;
        new_y = y + 1;
        coords = new_x.toString() + new_y.toString();

        if (moveAllowed(new_x, new_y,)){
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available kills to the left
        kill_x = x - 1;
        kill_y = y + 1;
        new_x = x - 2;
        new_y = y + 2;
        coords = new_x.toString() + new_y.toString();

        if (killAllowedWhite(kill_x, kill_y, new_x, new_y,)){
            for (var i = 0; i < current_pos_white.length; i++) {
                if (kill_x == current_pos_white[i].x && kill_y == current_pos_white[i].y ){
                    white_checker[i].classList.add('kill-checker');
                }
            }
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }

        //Available kills to the right
        kill_x = x + 1;
        kill_y = y + 1;
        new_x = x + 2;
        new_y = y + 2;
        coords = new_x.toString() + new_y.toString();

        if (killAllowedWhite(kill_x, kill_y, new_x, new_y,)){
            for (var i = 0; i < current_pos_white.length; i++) {
                if (kill_x == current_pos_white[i].x && kill_y == current_pos_white[i].y ){
                    white_checker[i].classList.add('kill-checker');
                }
            }
            for (var i = 0; i < black_cell.length; i++){
                if (black_cell[i].innerText == coords) {
                    black_cell[i].classList.add('active-cell')
                }
            }
        }
    }
}

//Function to find moves available
function moveAllowed(x, y){
    var move_alowed = true;

    for (var i = 0; i < current_pos_white.length; i++){
        if (x == current_pos_white[i].x && y == current_pos_white[i].y ) {
            move_alowed = false;
            return move_alowed;
        }
        if (x == current_pos_black[i].x && y == current_pos_black[i].y ) {
            move_alowed = false;
            return move_alowed;
        }
    }
    return move_alowed;
}

//Function to find available kills - (to kill BLACK checkers)
function killAllowedBlack(kill_x, kill_y, new_x, new_y){
    var kill_allowed = false;

    for (var i = 0; i < current_pos_black.length; i++) {
        if (kill_x == current_pos_black[i].x && kill_y == current_pos_black[i].y ) {
            for (var n = 0; n < current_pos_black.length; n++) {
                if (new_x == current_pos_black[n].x && new_y == current_pos_black[n].y ) {
                    kill_allowed = false;
                    return kill_allowed;
                } else {
                    kill_allowed = true;
                }

                if (new_x == current_pos_white[n].x && new_y == current_pos_white[n].y ) {
                    kill_allowed = false;
                    return kill_allowed;
                } else {
                    kill_allowed = true;
                }
            }
        }
    }
    return kill_allowed;
}

//Function to find available kills - (to kill WHITE checkers)
function killAllowedWhite(kill_x, kill_y, new_x, new_y){
    var kill_allowed = false;

    for (var i = 0; i < current_pos_white.length; i++) {
        if (kill_x == current_pos_white[i].x && kill_y == current_pos_white[i].y ) {
            for (var n = 0; n < current_pos_white.length; n++) {
                if (new_x == current_pos_white[n].x && new_y == current_pos_white[n].y ) {
                    kill_allowed = false;
                    return kill_allowed;
                } else {
                    kill_allowed = true;
                }
                if (new_x == current_pos_black[n].x && new_y == current_pos_black[n].y ) {
                    kill_allowed = false;
                    return kill_allowed;
                } else {
                    kill_allowed = true;
                }
            }
        }
    }
    return kill_allowed;
}


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
        cell = document.querySelectorAll('.cell'),
        kill = false;
        cheker_number = active_checker.innerText;

    for (var i = 0; i < white_checker.length; i++){
        if (black_checker[i].classList.contains('kill-checker')) {
            var kill_checker = document.querySelector('.kill-checker'),
                kill_checker_nr = parseInt(kill_checker.innerText),
                x_home = home_pos_black[kill_checker_nr].x,
                y_home = home_pos_black[kill_checker_nr].y;
                kill = true;
        }
        if (white_checker[i].classList.contains('kill-checker')) {
            var kill_checker = document.querySelector('.kill-checker'),
                kill_checker_nr = parseInt(kill_checker.innerText),
                x_home = home_pos_white[kill_checker_nr].x,
                y_home = home_pos_white[kill_checker_nr].y;
                kill = true;
        }
    }

    //New position of the checker - Team WHITE
    if (active_checker.classList.contains('white-checker')){

        active_checker.style = `left: calc(12.5% * ${x}); top: calc(12.5% * ${y}); transition: 0.5s;`;

        if (kill){
            kill_checker.style = `left: calc(12.5% * ${x_home}); top: calc(12.5% * ${y_home}); transition: 0.5s;`;
            current_pos_black[kill_checker_nr].x = '';
            current_pos_black[kill_checker_nr].y = '';
        }



        current_pos_white[cheker_number].x = parseInt(x);
        current_pos_white[cheker_number].y = parseInt(y);
        turn_white = false;
        turn_black = true;

        console.log(current_pos_black);
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

        if (kill){
            kill_checker.style = `left: calc(12.5% * ${x_home}); top: calc(12.5% * ${y_home}); transition: 0.5s;`;
            current_pos_white[kill_checker_nr].x = '';
            current_pos_white[kill_checker_nr].y = '';
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
