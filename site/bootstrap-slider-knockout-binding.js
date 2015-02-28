ko.bindingHandlers.sliderValue = {
	init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
		var params = valueAccessor();

		// Check whether the value observable is either placed directly or in the paramaters object.
		if (!(ko.isObservable(params) || params['value']))
			throw "You need to define an observable value for the sliderValue. Either pass the observable directly or as the 'value' field in the parameters.";

		// Identify the value and initialize the slider
		var valueObservable;
		if (ko.isObservable(params)) {
			valueObservable = params;
			$(element).slider({value: ko.unwrap(params)});
		}
		else {
			valueObservable = params['value'];
			// Replace the 'value' field in the options object with the actual value
			params['value'] = ko.unwrap(valueObservable);
			$(element).slider(params);
		}

		// Make sure we update the observable when changing the slider value
		$(element).on('slide', function (ev) {
			valueObservable(ev.value);
		});

	},
	update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
		var modelValue = valueAccessor();
		var valueObservable;
		if (ko.isObservable(modelValue))
			valueObservable = modelValue;
		else
			valueObservable = modelValue['value'];

		$(element).slider('setValue', parseFloat(valueObservable()));
	}
};