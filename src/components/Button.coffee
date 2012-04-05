class Button extends UIElement
	constructor: () ->
		super()
		
		@define 'label', 'Button'
				
		# Initialize ourselves with an HTMLButtonSkin
		@define('skin', new HTMLButtonSkin()).subscribe @onExtensionChanged()