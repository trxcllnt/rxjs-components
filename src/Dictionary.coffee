class Dictionary
	constructor: () ->
		subjects = {}
		
		@define = (name, initial) =>
			setObservable name, initial.publish() if(initial != undefined and (initial instanceof Rx.Observable))
			setVal name, initial if(initial == undefined or (initial instanceof Rx.Observable) == false)
			@__defineGetter__ name, () -> subjects[name]
			@[name]
		
		setObservable = (name, observable) =>
			disposable = observable.connect()
			@__defineSetter__ name, (val) -> 
				disposable.dispose()
				disposable = (observable = val.publish()).connect()
				subjects[name] = observable;
				return
			return
		
		setVal = (name, initial) =>
			subjects[name] = new Rx.BehaviorSubject(initial)
			@__defineSetter__ name, (val) -> subjects[name].onNext val; return
			return
	