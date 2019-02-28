'use strict';


var width = 8,
    height = 8,
    turn_white = true,
    turn_black = false,
    kill_object = [],
    start_pos_black = [
        {
            x: 1,
            y: 0
        },
        {
            x: 3,
            y: 0
        },
        {
            x: 5,
            y: 0
        },
        {
            x: 7,
            y: 0
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 4,
            y: 1
        },
        {
            x: 6,
            y: 1
        },
        // {
        //     x: 1,
        //     y: 2
        // },
        {
            x: 1,
            y: 4
        },
        // {
        //     x: 3,
        //     y: 2
        // },
        {
            x: 3,
            y: 4
        },
        {
            x: 5,
            y: 2
        },
        {
            x: 7,
            y: 2
        },
    ],

    start_pos_white = [
        {
            x: 0,
            y: 5
        },
        {
            x: 2,
            y: 5
        },
        // {
        //     x: 4,
        //     y: 5
        // },
        {
            x: 4,
            y: 3
        },
        // {
        //     x: 6,
        //     y: 5
        // },
        {
            x: 6,
            y: 3
        },
        {
            x: 1,
            y: 6
        },
        {
            x: 3,
            y: 6
        },
        {
            x: 5,
            y: 6
        },
        // {
        //     x: 7,
        //     y: 6
        // },
        {
            x: 7,
            y: 4
        },
        {
            x: 0,
            y: 7
        },
        {
            x: 2,
            y: 7
        },
        {
            x: 4,
            y: 7
        },
        {
            x: 6,
            y: 7
        },
    ],

    home_pos_black = [
        {
            x: -2,
            y: 5
        },
        {
            x: -3,
            y: 5
        },
        {
            x: -4,
            y: 5
        },
        {
            x: -5,
            y: 5
        },
        {
            x: -2,
            y: 6
        },
        {
            x: -3,
            y: 6
        },
        {
            x: -4,
            y: 6
        },
        {
            x: -5,
            y: 6
        },
        {
            x: -2,
            y: 7
        },
        {
            x: -3,
            y: 7
        },
        {
            x: -4,
            y: 7
        },
        {
            x: -5,
            y: 7
        },
    ],

    home_pos_white = [
        {
            x: 9,
            y: 0
        },
        {
            x: 10,
            y: 0
        },
        {
            x: 11,
            y: 0
        },
        {
            x: 12,
            y: 0
        },
        {
            x: 9,
            y: 1
        },
        {
            x: 10,
            y: 1
        },
        {
            x: 11,
            y: 1
        },
        {
            x: 12,
            y: 1
        },
        {
            x: 9,
            y: 2
        },
        {
            x: 10,
            y: 2
        },
        {
            x: 11,
            y: 2
        },
        {
            x: 12,
            y: 2
        },
    ],

    current_pos_white = start_pos_white,
    current_pos_black = start_pos_black;
