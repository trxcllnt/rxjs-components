class UIElement extends Dictionary
	constructor: () ->
		super()
		
		@define 'x', 0
		@define 'y', 0
		@define 'width', 0
		@define 'height', 0
		@define 'parent', $ 'body'
	
	# Returns a function that watches when an extension instance
	# changes, de-registers it, and registers the new extension.
	onExtensionChanged: () ->
		extension = null
		(newExtension) =>
			return if newExtension == extension
			extension.register null if extension?
			(extension = newExtension).register @ if newExtension?
			return