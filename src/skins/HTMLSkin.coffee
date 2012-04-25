class HTMLSkin extends Dictionary
	constructor: () ->
		super()
		
		@define 'element'
		
		@skin = skin = @getSkin()
		
		disposable = Rx.Disposable.empty
		
		@element.where((e) -> e?).subscribe(((e) => 
				disposable.dispose()
				disposable = new Rx.CompositeDisposable()
				
				# Add a getter for 'selector' so elements can work with jQuery
				e.__defineGetter__ 'selector', () => @skin
				
				# Rewrite the element's 'parent' observable
				# to dispatch only if the parent isn't null
				e.useObservable 'parent', e.parent.where (p) -> p? && !(p instanceof UIElement)
				
				# Rewrite the element's 'index' observable to dispatch only if
				# the index is > -1 and less than the parent's child list length
				e.useObservable 'index',	e.index.combineLatest(e.parent, (i, p) -> 
					len = p.children().length
					if i < -1 or i > len then -1 else i
				).
				where((i) -> i != -1)
				
				# e.useObservable 'width', e.width.select((w) -> if isNaN(w) then skin.width() else w)
				# e.useObservable 'height', e.height.select((h) -> if isNaN(h) then skin.height() else h)
				
				# Apply any other listeners
				disposables = @addListeners(e, skin).concat [
					# If a parent is set before/without an index, set the
					# element's index to the end of the parent's child list.
					e.parent.takeUntil(e.index).subscribe (parent) => e.index = parent.children().length
					
					# Bind width
					e.width.where((x) -> !isNaN x).subscribe (width) -> skin.width width
					
					# Bind height
					e.height.where((x) -> !isNaN x).subscribe (height) -> skin.height height
					
					# Bind x
					e.x.where((x) -> !isNaN x).subscribe (x) -> skin.css 'left', x
					
					# Bind y
					e.y.where((y) -> !isNaN y).subscribe (y) -> skin.css 'top', y
					
					# Bind z to CSS3 transforms
					e.z.where((z) -> !isNaN z).subscribe (z) -> skin.css '-webkit-transform', "scaleZ(#{z})"
					
					# Define and bind the CSS property.
					# CSS doesn't belong in the UIElement's API unless
					# we're using an HTMLSkin, so define it here, not there.
					e.define('css', {}).subscribe (css) -> skin.css css
					
					# Watch for parent and index changes
					e.parent.combineLatest(e.index, (p, i) ->
							len = p.children().length
							return [p, p.append] if(len == 0)
							sibling = $(p.children().get(Math.min i - 1, len - 1))
							[sibling, sibling.after]
						).
						subscribe((a) -> a[1].apply a[0], skin)
				]
				disposable.add d for d in disposables
				
				return
			), null,
			(() ->
				disposable.dispose()
				disposable = null
				skin.remove()
				skin = null
			)
		)
	
	getSkin: () -> $ '<div></div>'
	addListeners: (element, skin) -> []