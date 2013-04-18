/*jslint es5:true, white:false */
/*globals document, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($) {

    var valsRows = [],
        objArr = [];

    function parseXSVLine(sep, line) {
        var i, j, chunk, quote;

        line = line.split(sep);
        // check for splits performed inside quoted strings and correct if needed
        for (i = 0; i < line.length; i++) {
            chunk = line[i].replace(/^[\s]*|[\s]*$/g, '');
            quote = '';
            if (chunk.charAt(0) === '"' || chunk.charAt(0) === "'") {
                quote = chunk.charAt(0);
            }
            if (quote !== '' && chunk.charAt(chunk.length - 1) === quote) {
                quote = '';
            }
            if (quote !== '') {
                j = i + 1;
                if (j < line.length) {
                    chunk = line[j].replace(/^[\s]*|[\s]*$/g, '');
                }
                while (j < line.length && chunk.charAt(chunk.length - 1) !== quote) {
                    line[i] += ',' + line[j];
                    line.splice(j, 1);
                    chunk = line[j].replace(/[\s]*$/g, '');
                }
                if (j < line.length) {
                    line[i] += ',' + line[j];
                    line.splice(j, 1);
                }
            }
        }
        for (i = 0; i < line.length; i++) {
            line[i] = $.trim(line[i]);
            // remove leading/trailing quotes
            if (line[i].charAt(0) === '"') {
                line[i] = line[i].replace(/^"|"$/g, '');
            } else if (line[i].charAt(0) === "'") {
                line[i] = line[i].replace(/^'|'$/g, '');
            }
        }
        return line;
    }

    function valsToJson(sep) {
        var f = document.forms.convertForm,
            valsText = f.elements.vals.value,
            jsonText = '',
            i, j;

        if (valsText === '') {
            throw new Error('Missing source data.');
        } else {
            valsRows = valsText.split(/[\r\n]/g); // split into rows
            // get rid of empty rows
            for (i = 0; i < valsRows.length; i++) {
                if (valsRows[i].replace(/^[\s]*|[\s]*$/g, '') === '') {
                    valsRows.splice(i, 1);
                    i--;
                }
            }
            if (valsRows.length < 2) {
                throw new Error('Data missing header row?');
            } else {
                objArr = [];
                for (i = 0; i < valsRows.length; i++) {
                    valsRows[i] = parseXSVLine(sep, valsRows[i]);
                }
                for (i = 1; i < valsRows.length; i++) {
                    if (valsRows[i].length > 0) {
                        objArr.push({});
                    }
                    for (j = 0; j < valsRows[i].length; j++) {
                        objArr[i - 1][valsRows[0][j]] = valsRows[i][j];
                    }
                }
                jsonText = JSON.stringify(objArr, null, "\t");
                f.elements.json.value = jsonText;
            }
        }
    }

    $.fn.xsv = valsToJson;
    window.Xsv = valsToJson;

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
