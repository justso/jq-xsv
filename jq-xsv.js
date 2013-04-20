/*jslint es5:true, white:false */
/*globals document, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($) {

    var valsRows = [],
        objArr = [];

    function parseXSVLine(sep, line) {
        line = line.split(sep);
        // check for splits performed inside quoted strings and correct if needed
        $.each(line, function (i, e) {
            var j, chunk, quote;
            chunk = $.trim(line[i]);
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
                    chunk = $.trim(line[j]);
                }
                while (j < line.length && chunk.charAt(chunk.length - 1) !== quote) {
                    line[i] += ',' + line[j];
                    line.splice(j, 1);
                    chunk = line[j].replace(/\s+$/g, '');
                }
                if (j < line.length) {
                    line[i] += ',' + line[j];
                    line.splice(j, 1);
                }
            }
        });
        $.each(line, function (i, e) {
            line[i] = $.trim(line[i]);
            // remove leading/trailing quotes
            if (line[i].charAt(0) === '"') {
                line[i] = line[i].replace(/^"|"$/g, '');
            } else if (line[i].charAt(0) === "'") {
                line[i] = line[i].replace(/^'|'$/g, '');
            }
        });
        return line;
    }

    function valsToJson(sep) {
        var f = document.forms.convertForm,
            valsText = $.trim(f.elements.vals.value),
            jsonText = '';
        setError();
        try {
            if (valsText === '') {
                throw new Error('Missing source data.');
            }
            if (sep === ',') { // preserve gaps
                valsText = reQuote(valsText);
            }

            // use standard line breaks
            valsText = valsText.replace(/\r/g, '\n');
            // get rid of empty rows
            valsText = valsText.replace(/\n{2,}/g, '\n');
            // split into rows
            valsRows = valsText.split(/\n/g);

            if (valsRows.length < 2) {
                throw new Error('Data missing header row?');
            }
            objArr = [];
            $.each(valsRows, function (i, e) {
                valsRows[i] = parseXSVLine(sep, valsRows[i]);
            });
            $.each(valsRows, function (i, e) {
                if (!i) return;
                if (valsRows[i].length > 0) {
                    objArr.push({});
                }
                $.each(valsRows[i], function (j, e) {
                    objArr[i - 1][valsRows[0][j]] = valsRows[i][j];
                });
            });
            jsonText = JSON.stringify(objArr, null, '\t');
            f.elements.json.value = jsonText;
        } catch (err) {
            setError(err);
        }
    }

    function setError(err) {
        if (err) {
            $('html').addClass('error');
            console.error(err.toString());
        } else {
            $('html').removeClass('error');
        }
    }

    function reQuote(str) {
        // look for quote bounded spans
        var quo = str.match(/"[^"]+"/g),
            non = str.split(/"[^"]+"/g),
            neo = [];
        quo && $.each(quo, function(i, e) {
            // escape line breaks within
            e = e.replace(/\n/g, '\\n');
            neo.push(non[i], e);
        });
        neo.push(non.pop());
        return neo.join('');
    }

    $.fn.xsv = valsToJson;
    window.Xsv = valsToJson;

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
