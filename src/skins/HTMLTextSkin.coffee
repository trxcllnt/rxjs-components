class HTMLTextSkin extends HTMLSkin
	getSkin: () -> $ '<p></p>'
	
	addListeners: (element, skin) -> [
			element.text.subscribe (text) -> skin.text text
		]