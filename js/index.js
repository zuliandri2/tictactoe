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

    this.getTabungX = function () {
        return tabungX;
    };

    this.getTabungO = function() {
        return tabungO;
    };

    this.setTabung = function(rows, columns, values) {
        var val = {
            row: rows,
            column: columns,
            value: values,
        };

        if (values == X) {
            tabungX.push(val);
        } else  {
            tabungO.push(val);
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

function straigt(vals) {
    if (vals == X) {
        for (var i = 0; i < table_row; i++) {
            for (var j = 0; j < table_column; j++) {
                for (var k = 0; k < save.getTabungX(); k++) {
                    if () {
                        
                    }
                }
            }
        }
    }  else {
        save.getTabungO();
    }

}

$(document).ready(function () {
    load();
    $('td').on('click', assigntxo);
});