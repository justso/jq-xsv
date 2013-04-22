/*jslint es5:true, white:false */
/*globals $, clog */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    console.log('main');
    //    for each in data
    // create div
    // create section
    // create article
    var body = $('body');

    function textify(obj, ele) {
        $.each(obj, function(i, e) {
            var p =  $('<p>')
            .append('<strong>' +i + '</strong>: ')
            .append(e);
            p.appendTo(ele)
        });
    }
    $.each(DATA, function(i, DIV) {
        var div = $('<div>').appendTo(body);
        $('<h1>').text(i).appendTo(div);

        $.each(DIV, function(i, SEC) {
            var sec = $('<section>').appendTo(div);
            $('<h2>').text(i).appendTo(sec);

            $.each(SEC, function(i, ART) {
                var art = $('<article>').appendTo(sec);
                $('<h3>').text('article ' + i).appendTo(art);
                textify(ART, art);
            });
        });
    });

}
