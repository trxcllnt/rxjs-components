class HTMLSkin extends Dictionary
	constructor: () ->
		super()
		
		@define 'element'
		
		skin = @getSkin()
		
		disposable = Rx.Disposable.empty
				
		@element.where((e) -> e?).subscribe( ((element) => 
				disposable.dispose()
				disposable = new Rx.CompositeDisposable()
				
				e = element
				
				# Rewrite the element's 'parent' observable
				# to dispatch only if the parent isn't null
				e.useObservable 'parent', e.parent.where (p) -> p?
				
				# Rewrite the element's 'index' observable to dispatch only if
				# the index is > -1 and less than the parent's child list length
				e.useObservable 'index',	e.index.combineLatest(e.parent, () -> arguments).
												where((ip) -> ((i, p) -> i > -1 && i <= p.children().length).apply(null, ip)).
												select((ip) -> ip[0])
				
				# If a parent is set before/without an index, set the
				# element's index to the end of the parent's child list.
				disposable.add e.parent.takeUntil(e.index).subscribe (parent) => e.index = parent.children().length
				
				# Apply any other listeners
				disposable.add.apply null, @addListeners(element, skin)
				
				disposable.add element.parent.
					combineLatest(element.index, () -> arguments).
					subscribe((pi) -> ((p, i) -> 
						len = p.children().length
						if(len == 0)
							p.append skin
						else
							$(p.children().get(Math.min i - 1, len - 1)).after(skin)
						).apply(null, pi))
				
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