/*jslint es5:true, white:false */
/*globals $, Components, Compositions, Giving, Support, clog, console */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    console.log('main');
    DATA = {
        Compositions: Compositions,
        Components: Components,
        Giving: Giving,
        Support: Support,
    };
    var nav = $('nav');

    function textify(obj, ele) {
        $.each(obj, function (i, e) {
            var t = ('<strong>' + i + '</strong>: ') + e.replace(/\\n/g, '<br>'),
                p = $('<p>').html(t);
            p.appendTo(ele);
        });
    }

    function keyhoist(arr, num) {
        var key = arr[num].key;
        if (key) {
            clog(key, num);
            arr[key] = arr[num];
        }
        return key || (num + 1);
    }

    function pretreat() {
        //    search for x-refs %_
    }

    function anchor(str, ele, wrap) {
        var anc, lnk, pre = '';

        if (typeof str === 'object') {
            pre = str[0] + '-';
            str = str[1];
        }
        wrap = wrap || '<button>';

        // add anchor
        anc = $('<a id="' + pre + str + '">');
        ele.before(anc);

        // make nav link
        lnk = $('<a href="#' + pre + str + '">');
        lnk.text(str);
        lnk.appendTo(nav).wrap(wrap);
    }

    $.each(DATA, function (i1, DIV) {
        var div = $('<div>').appendTo('body');
        anchor(i1, $('<h1>').text(i1).appendTo(div), '<h4>');

        $.each(DIV, function (i2, SEC) {
            var sec = $('<section>').appendTo(div);
            anchor(i2, $('<h2>').text(i2).insertBefore(sec), '<p>');

            $.each(SEC, function (i3, ART) {
                var art = $('<article>').appendTo(sec);
                i3 = keyhoist(SEC, i3);
                anchor([i2, i3], $('<h3>').text('article ' + i3).insertBefore(art));

                textify(ART, art);
            });
        });
    });
}
