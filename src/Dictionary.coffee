class Dictionary
	constructor: () ->
		observables = {}
		subjects = {}
		
		@define = (name, initial) =>
			@__defineGetter__ name, () -> observables[name]
			if(initial != undefined and (initial instanceof Rx.Observable))
				setObservable name, initial.publish() 
			else
				setVal name, initial
		
		@useObservable = (name, observable) => observables[name] = observable
		
		setObservable = (name, observable) =>
			disposable = observable.connect()
			@__defineSetter__ name, (val) -> 
				disposable.dispose()
				disposable = (observable = val.publish()).connect()
				subjects[name] = observable
			subjects[name] = observables[name] = observable;
		
		setVal = (name, initial) =>
			@__defineSetter__ name, (val) -> subjects[name].onNext val
			subjects[name] = observables[name] = new Rx.BehaviorSubject(initial)
	
	@inc: 1
	getUUID: () -> Math.round Math.random() * new Date().getTime() + ++Dictionary.inc, Math.pow 10, 10