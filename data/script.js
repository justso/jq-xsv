/*jslint es5:true, white:false */
/*globals $, clog */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    console.log('main');
    DATA = {
        Compositions: Compositions,
        Components: Components,
        Giving: Giving,
        Support: Support,
    };

    function textify(obj, ele) {
        $.each(obj, function(i, e) {
            var t = ('<strong>' +i + '</strong>: ') + e.replace(/\\n/g, '<br>'),
            p =  $('<p>').html(t);
            p.appendTo(ele);
        });
    }
    function keyhoist(arr, num) {
        var key = arr[num].key;
        clog(key, num)
        return key || (num + 1);
    }
    $.each(DATA, function(i, DIV) {
        var div = $('<div>').appendTo('body');
        $('<h1>').text(i).appendTo(div);

        $.each(DIV, function(i, SEC) {
            var sec = $('<section>').appendTo(div);
            $('<h2>').text(i).appendTo(sec).before($('<a id='+i+'>'));

            $.each(SEC, function(i, ART) {
                var art = $('<article>').appendTo(sec);
                i = keyhoist(SEC, i);
                $('<h3>').text('article ' + i).appendTo(art);
                textify(ART, art);
            });
        });
    });

}
