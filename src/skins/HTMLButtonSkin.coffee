class HTMLButtonSkin
	constructor: () ->
		button = $ '<button></button>'
		disposable = Rx.Disposable.empty
		
		@register = (element) ->
			disposable.dispose()
			return if !element?
			
			disposable = new Rx.CompositeDisposable()
			disposable.add element.label.subscribe (text) -> button.text text
			disposable.add element.parent.subscribe (parent) -> parent.append button
			return