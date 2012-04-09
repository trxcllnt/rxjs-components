class Button extends UIElement
	constructor: () ->
		super()
		
		@define 'label', 'Button'
		@define 'toggle', false
		@define 'selected', false
		
		@define('skin', null).subscribe @onExtensionChanged()
		
		# Initialize ourselves with an HTMLButtonSkin
		@toggle.subscribe (toggle) => 
			@skin = if toggle
			then new HTMLToggleButtonSkin()
			else new HTMLButtonSkin()
		