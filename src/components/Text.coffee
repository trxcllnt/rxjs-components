class Text extends UIElement
	constructor: () ->
		super()
		
		@define 'text', ''
		@define 'caret', 0
		@define 'range', [0, 0]
		
		# Initialize ourselves with an HTMLTextSkin
		@define('skin', new HTMLTextSkin()).subscribe @onExtensionChanged()