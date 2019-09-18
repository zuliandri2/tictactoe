const  X = "X";
const  O = "O";

var table_row = 3,
    table_column = 3;

function load() {
    var html = '', i = 0, j = null;

    while (i < table_row) {
        html += '<tr>',
            j = 0;

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
    var content = null;

    this.getContent = function ()  {
        return content;
    };

    this.setContent = function (param) {
        content = param;
    };
};

var save = new function () {
    var tabungX = [];
    var tabungO = [];
    var status = false;

    this.getTabungX = function () {
        return tabungX;
    };

    this.getTabungO = function() {
        return tabungO;
    };

    this.setTabung = function(rows, columns, values) {
        var val = {
            row : rows,
            column: columns,
            value: values
        };

        if (values == X) {
            tabungX.push(val);
        } else  {
            tabungO.push(val);
        }
    };

    this.byRows = function (rows, values) {
        if (!status) {
            for (var i in tabungX) {
                if (tabungX[i].row == rows) {
                    for (var j = 0; j < table_column; j++) {
                        if (tabungX[i].column != j && tabungX[i].value != values) {
                            status = true;
                        } else {
                            status = false;
                            break;
                        }
                    }
                }
            }
        }
        return status;
    };

    this.byColumn = function (columns, values) {
        if (!status) {
            for (var i in tabungX) {
                if (tabungX[i].column == columns) {
                    for (var j = 0; j < table_row; j++) {
                        if (tabungX[i].row == j && tabungX[i].value == values) {
                            status = true;
                        } else {
                            status = false;
                            break;
                        }
                    }
                }
            }
        }
        return status;
    };

    this.byRowsColumns = function (rows, columns, values) {
        if (!status) {
            if (var t in tabungX) {
                for (var i = 0, j = 0; i < table_row && j < table_column; i++, j++) {
                    if (tabungX[t].row == i && tabungX[i].column == j && tabungX[t].value == values) {
                        status = true;
                    } else  {
                        status = false;
                        break;
                    }
                }
            }
        }
        return status;
    };

    this.checking = function (rows, columns, values) {
        if ( this.byRows(rows, values) == true) {
            alert('Menang Rows');
        } else if (this.byColumn(rows, values) == true) {
            alert('Menang Columns');
        } else if ( this.byRowsColumns(rows, columns, values) == true) {
            alert('Menang By Rows Columns');
        }
    };

};

function assigntxo(e) {
    var d = e.target.textContent,
        row = e.target.dataset.row,
        column = e.target.dataset.column;

    if (d.toString().toUpperCase() != X && d.toString().toUpperCase() != O)  {
        if (assign.getContent() == X) {
            assign.setContent(O);
        } else {
            assign.setContent(X);
        }

        save.setTabung(row, column, assign.getContent());
        e.target.innerText = assign.getContent();
        straigt();
    }
}

function straigt(row, column, vals) {
    if (vals == X) {
    }
}

$(document).ready(function () {
    load();
    $('td').on('click', assigntxo);
});