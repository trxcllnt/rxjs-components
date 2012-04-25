class Range extends UIElement
	constructor: () ->
		super()
		
		@define 'min', 0
		@define 'max', 100
		
		@useObservable 'value',	@define('value', 50).
									combineLatest(@min, (val, min) -> if val >= min then val else min).
									combineLatest(@max, (val, max) -> if val <= max then val else max)
		
		@define('skin', new HTMLSliderSkin()).subscribe @onExtensionChanged()
		