/*globals define, exports, module, require */

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'knockout', 'cards'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'), require('knockout'), require('cards'));
    } else {
        // Browser globals (root is window)
        root.cards = factory(root.jQuery, root.ko, root.cards);
    }
}(this, function ($, ko, cards) {
    'use strict';

    /*
     * cards JS suport for Knockout
     */
    ko.bindingHandlers.fan = {
        init: function (element) {
            $(element).addClass('fan');
        },

        update: function (element, valueAccessor) {
            var params = valueAccessor(),
                options = {},
                p;
            for (p in params) {
                if (params.hasOwnProperty(p)) {
                    options[p] = ko.unwrap(params[p]);
                }
            }
            cards.fan($(element), options);
        }
    };

    ko.bindingHandlers.hand = {

        update: function (element, valueAccessor) {
            var params = valueAccessor(),
                options = {},
                p;
            for (p in params) {
                if (params.hasOwnProperty(p)) {
                    options[p] = ko.unwrap(params[p]);
                }
            }
            cards.hand($(element), options);
        }
    };

}));

