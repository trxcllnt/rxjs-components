class UIElement extends Dictionary
	constructor: () ->
		super()
		
		@define 'x', 0
		@define 'y', 0
		@define 'width', 0
		@define 'height', 0
		@define 'parent', null
		@define 'index', -1
	
	# Returns a function that watches when an extension instance
	# changes, de-registers it, and registers the new extension.
	onExtensionChanged: () ->
		extension = null
		(newExtension) =>
			return if newExtension == extension
			extension.element.onCompleted() if extension? and extension.element?
			(extension = newExtension).element = @ if newExtension? and newExtension.element?
			return