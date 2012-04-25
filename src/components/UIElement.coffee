class UIElement extends Dictionary
	constructor: () ->
		super()
		
		@define 'x', NaN
		@define 'y', NaN
		@define 'z', NaN
		
		@define 'width', NaN
		@define 'height', NaN
		
		@define('parent', null)
		
		@define 'index', -1
		
		@useObservable 'addedChild', @define('addedChild', null).where((x) -> x?)
		@useObservable 'removedChild', @define('removedChild', null).where((x) -> x?)
		
		return
	
	# Returns a function that watches when an extension instance
	# changes, de-registers it, and registers the new extension.
	onExtensionChanged: () ->
		extension = null
		(newExtension) =>
			return if newExtension == extension
			extension.element.onCompleted() if extension? and extension.element?
			(extension = newExtension).element = @ if newExtension? and newExtension.element?
			return