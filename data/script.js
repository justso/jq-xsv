/*jslint es5:true, white:false */
/*globals $, Components, Compositions, Giving, Support, clog, console */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    console.log('main');
    DATA = {
        Support: Support,
        Components: Components,
        Giving: Giving,
        Compositions: Compositions,
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

    function pretreat(i, x) {
        x = x || i;
        if (typeof x === 'object') {
            $.each(x, pretreat);
        } else {
            var arr = x.match && x.match(/\%_[\w]+/g); // search for x-refs %_
            //   for each match
            arr && $.each(arr, function (i, e){
                var seg = e.split('_');
                if (!seg) return;
                seg.shift(); // drop token
                //     resolve ref
                clog('segs', seg, window[seg[0]]);
                clog('segs', window[seg[0]][seg[1]]);
                clog('segs', window[seg[0]][seg[1]][seg[2]]);
            });
        //     replace
        }
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
        anchor(['doc', i1], $('<h1>').text(i1).appendTo(div), '<h4>');

        $.each(DIV, function (i2, SEC) {
            var sec = $('<section>').appendTo(div);
            anchor([i1, i2], $('<h2>').text(i2).insertBefore(sec), '<p>');

            $.each(SEC, function (i3, ART) {
                var art = $('<article>').appendTo(sec);
                i3 = keyhoist(SEC, i3);
                anchor([i2, i3], $('<h3>').text(i2 + '/' + i3).insertBefore(art));

                textify(ART, art);
            });
        });
    });
    groupie();
}

function groupie(args) {
    var x = $();
    $('button').each(function(i, e) {
        x.push(e);
        if ($(e).next().is('button')) {
            clog(x.length);
        } else {
            x.wrapAll('<aside>');
            x = $();
        }
    })
}
