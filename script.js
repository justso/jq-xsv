/*jslint es5:true, white:false */
/*globals $, clog */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function main() {
    $('.load').each(function () {
        var me = $(this),
            bt = me.prev();
        bt.text('Load ' + bt.text());
        bt.on('click', function () {
            $('#vals').text(me.text());
        });
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* LIFTED FROM
 *
 * csv-to-json: A utility that converts data format from CSV to JSON.
 * Copyright (C) 2009-2012 Christopher Parker <http://www.cparker15.com/>
 *
 * csv-to-json is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * csv-to-json is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with csv-to-json.  If not, see <http://www.gnu.org/licenses/>.
 */
