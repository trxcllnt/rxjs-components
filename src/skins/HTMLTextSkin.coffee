class HTMLTextSkin
	constructor: () ->
		paragraph = $ '<p></p>'
		disposable = Rx.Disposable.empty
		
		@register = (element) ->
			disposable.dispose()
			return if !element?
			disposable = new Rx.CompositeDisposable()
			
			# Bind the element's text property to paragraph.text
			disposable.add element.text.subscribe (text) -> paragraph.text text
			
			# Add the paragraph to the element's parent
			disposable.add element.parent.subscribe (parent) -> parent.append paragraph
			
			return
		