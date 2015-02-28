/*
 * cards JS suport for Knockout
 */
ko.bindingHandlers.fan = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).addClass('fan');
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var params = valueAccessor();
        var options = {};
        for (var p in params) {
            options[p] = ko.unwrap(params[p]);
        }
        cards.fan($(element), options);
    }
};