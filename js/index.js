const  X = "X";
const  O = "O";

let table_row = 3,
    table_column = 3;

function load() {
    let html = '', i = 0, j = null;

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
        increament = 0;

    this.getContent = function ()  {
        return content;
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

    if (d.toString().toUpperCase() != X && d.toString().toUpperCase() != O) {
        if (assign.getContent() == X) {
            assign.setContent(O);
            storeXO.setTabung(row, column, assign.getContent());
            e.target.innerText = assign.getContent();
            if ( cb.check(storeXO.getTabungO(), row, column, assign.getContent()) ) {
                alert('Player 2 win');
                return;
            }
        } else {
            assign.setContent(X);
            storeXO.setTabung(row, column, assign.getContent());
            e.target.innerText = assign.getContent();
            if (cb.check(storeXO.getTabungX(), row, column, assign.getContent()) ) {
                alert('Player 1 win');
                return;
            }
        }

        assign.count();
        if (assign.getCount() == (table_row * table_column)) {
            alert('Tie');
        }
    }
}

function addRowColumn() {

}

function reload() {
    location.reload();
}

$(document).ready(function () {
    load();
    $('td').on('click', assigntxo);
    $('#addRowColumn', addRowColumn);
    $('#reset').on('click', reload);

});