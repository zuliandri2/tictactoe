const  X = "X";
const  O = "O";

let table_row = 3,
    table_column = 3,
    p1Color = '#000',
    p2Color = '#000';

function load() {
    let html = '', i = 0, j = null;

    $('table').empty();
    while (i < table_row) {
        j = 0;
        html += '<tr>';

        while (j < table_column) {
            html += '<td data-row="' + i + '" data-column="' + j + '"></td>';
            j++;
        }
        html += '</tr>';
        i++;
    }

    $('table').append(html);
}

var assign = new function() {
    let content = null,
        increament = 0,
        flagsWin = false;

    this.getContent = function ()  {
        return content;
    };

    this.getFlagsWin = function () {
        return flagsWin;
    };

    this.setFlagsWin = function (params) {
        flagsWin = params;
    };

    this.setContent = function (param) {
        content = param;
    };

    this.count = function () {
        increament++;
    };

    this.getCount = function () {
        return increament;
    };

    this.resetCount = function () {
        increament = 0;
    };
};

var storeXO = new function () {
    let tabungX = [],
        tabungO = [];

    this.getTabungX = function () {
        return tabungX;
    };

    this.getTabungO = function () {
        return tabungO;
    };

    this.setTabung = function (rows, columns, values) {
        let val = {
            row: rows,
            column: columns,
            value: values
        };

        if (values == X) {
            tabungX.push(val);
        } else {
            tabungO.push(val);
        }
    };

    this.resetTabungX = function () {
        tabungX.splice(0, tabungX.length);
    };

    this.resetTabungO = function () {
        tabungO.splice(0, tabungO.length);
    };
};

 function checkingFlow() {
     let status = 0;
    this.byRows = function (store, rows, values) {
        if (!status) {
            let i;
            for (i in store) {
                if (store[i].row == rows) {
                    for (var j = 0; j < table_column; j++) {
                        if (store[i].column == j) {
                            if (store[i].value == values) {
                                status++;
                                if (status == table_column) return true;
                            }
                        }
                    }
                }
            }
        }
        status = 0;
        return false;
    };

    this.byColumn = function (store, columns, values) {
        if (!status) {
            let i;
            for (i in store) {
                if (store[i].column == columns) {
                    for (var j = 0; j < table_row; j++) {
                        if (store[i].row == j) {
                            if (store[i].value == values) {
                                status++;
                                if (status == table_row) return true;
                            }
                        }
                    }
                }
            }
        }
        status = 0;
        return status;
    };

    this.byRowsColumnsRightDown = function (store, rows, columns, values) {
        if (!status) {
            let t;
            for (t in store) {
                for (let i = 0, j = 0; i < table_row && j < table_column; i++, j++) {
                    if (store[t].row == i && store[t].column == j) {
                        if (store[t].value == values) {
                            status++;
                            if (status == table_row) return true;
                        }
                    }
                }
            }
        }
        status = 0;
        return status;
    };

     this.byRowsColumnsLeftDown = function (store, rows, columns, values) {
         if (!status) {
             let t;
             for (t in store) {
                 for (let i = table_row - 1, j = 0; i >= 0 && j <= table_column - 1; i--, j++) {
                     if (store[t].row == i && store[t].column == j) {
                         if (store[t].value == values) {
                             status++;
                             if (status == table_row) return true;
                         }
                     }
                 }
             }
         }
         status = 0;
         return status;
     };
}

function checkingBuilder() {
    this.check = function (stores, rows, columns, values) {
        let c = new checkingFlow();
        if ( c.byRows(stores, rows, values) == true) {
            return true;
        } else if (c.byColumn(stores, columns, values) == true) {
            return true;
        } else if ( c.byRowsColumnsRightDown(stores, rows, columns, values) == true) {
            return true;
        } else if (c.byRowsColumnsLeftDown(stores, rows, columns, values) == true) {
            return true;
        } else {
            return false;
        }
    };
}

function assigntxo(e) {
    let d = e.target.textContent,
        row = e.target.dataset.row,
        column = e.target.dataset.column,
        cb = new checkingBuilder();

    if (!assign.getFlagsWin()) {
        if (d.toString().toUpperCase() != X && d.toString().toUpperCase() != O) {
            if (assign.getContent() == X) {
                assign.setContent(O);
                storeXO.setTabung(row, column, assign.getContent());
                $(e.target)
                    .html(assign.getContent())
                    .css('color', p2Color);;
                if (cb.check(storeXO.getTabungO(), row, column, assign.getContent())) {
                    assign.setFlagsWin(true);
                    winRate.p2 = winRate.p2 + 1;
                    setViewWinRate();
                    assign.setContent(X);
                    alert('Player 2 win');
                }
            } else {
                assign.setContent(X);
                storeXO.setTabung(row, column, assign.getContent());
                $(e.target)
                    .html(assign.getContent())
                    .css('color', p1Color);
                if (cb.check(storeXO.getTabungX(), row, column, assign.getContent())) {
                    assign.setFlagsWin(true);
                    winRate.p1 = winRate.p1 + 1;
                    setViewWinRate();
                    assign.setContent(O);
                    alert('Player 1 win');
                }
            }

            assign.count();
            if (assign.getCount() == (table_row * table_column) && assign.getFlagsWin() ==  false) {
                winRate.t = winRate.t + 1;
                setViewWinRate();
                alert('Tie');
            }
        }
    }
}

function sliderRowColumn() {
     var v = $('#row_column');
     $('#show_slider').html(v.val());
}

function apply() {
    let row_column = $('#row_column').val(),
        border_colour= $('#border_colour').val(),
        player1_clour = $('#p1Color').val(),
        player2_clour = $('#p2Colour').val();

    table_column = row_column;
    table_row = row_column;
    p1Color = player1_clour;
    p2Color = player2_clour;
    load();
    continueGame();
}

function continueGame() {
    storeXO.resetTabungX();
    storeXO.resetTabungO();
    assign.resetCount();
    assign.setFlagsWin(false);
    load();
}

function reload() {
    location.reload();
}

let winRate = {
    p1: 0,
    p2: 0,
    t: 0
};

 function setViewWinRate() {
     let winPlayer1 = $('#winPlayer1'),
         winPlayer2 = $('#winPlayer2'),
         tie = $('#tie');

     winPlayer1.html(winRate.p1);
     winPlayer2.html(winRate.p2);
     tie.html(winRate.t);
 }

$(document).ready(function () {
    let row_column = $('#row_column'),
        p1Color = $('#p1Color'),
        p2Color = $('#p2Colour');

    p1Color.val('#000');
    p2Color.val('#000');
    row_column.val(3);
    load();
    setViewWinRate();
    continueGame();
    $('#show_slider').html(row_column.val());
    $('table').on('click', 'td', assigntxo);
    $('#reset').on('click', reload);
    $('#apply').on('click', apply);
    $('#row_column').change(sliderRowColumn);
    $('#continue').click(continueGame);
});