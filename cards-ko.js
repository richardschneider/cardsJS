/*global ko, $, cards */
'use strict';

/*
 * cards JS suport for Knockout
 */
ko.bindingHandlers.fan = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).addClass('fan');
    },

    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
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

    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
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

