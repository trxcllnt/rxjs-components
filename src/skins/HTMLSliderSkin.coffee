class HTMLSliderSkin extends HTMLSkin
	getSkin: () -> $('<div></div>').slider()
	
	addListeners: (element, skin) -> 
		skin.slider slide: (e, ui) -> element.value = ui.value
		[
			element.min.subscribe (min) -> skin.slider('option', 'min', min - 1)
			element.max.subscribe (max) -> skin.slider('option', 'max', max + 1)
			skin.bindAsObservable('slide').subscribe () -> element.value = skin.slider 'option', 'value'
		]