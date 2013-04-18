/*jslint es5:true, white:false */
/*globals $, clog */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    $('.load').each(function () {
        var me = $(this),
            bt = me.prev();
        clog(me, bt);
        bt.text('Load ' + bt.text());
        bt.on('click', function () {
            $('#vals').text(me.text());
        });
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
