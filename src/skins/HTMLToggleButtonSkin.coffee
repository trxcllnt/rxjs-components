class HTMLToggleButtonSkin extends HTMLSkin
	getSkin: () ->
		div = $ '<div></div>'
		id = 'checkbox_' + @getUUID().toString()
		
		checkbox = $ '<input id="checkbox" type="checkbox"></input>'
		checkbox.prop 'id', id
		
		label = $ '<label></label/>'
		label.prop 'for', id
		
		div.append checkbox, label
		div
	
	addListeners: (element, skin) -> 
		checkbox = $ skin.children().get 0
		label = $ skin.children().get 1
		[
			# combineLatest of toggle and selected, because a button
			# can only be selected if toggle and selected are both
			# true. If either is false, the checkbox shouldn't be selected.
			element.toggle.
				combineLatest(element.selected, (toggle, selected) -> toggle and selected).
				subscribe (selected) -> checkbox.checked = selected
			
			element.label.subscribe (str) -> label.text str
			
			checkbox.changeAsObservable().subscribe () -> element.selected = !checkbox.checked
		]