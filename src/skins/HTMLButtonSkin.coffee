class HTMLButtonSkin extends HTMLSkin
	getSkin: () -> $ '<button></button>'
		
	addListeners: (element, skin) -> 
		clicked = false
		[
			element.label.subscribe (text) -> skin.text text
			skin.clickAsObservable().subscribe () -> element.selected = clicked = !clicked
		]