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
		
		@useObservable = (name, observable) => 
			observable.__defineGetter__ 'val', () -> subjects[name].val
			observables[name] = observable
		
		@dispose = () => 
			for own key, subj of subjects
				subj.onCompleted()
				subj.dispose()
				delete subj.val
				delete @[key]
				delete subjects[key]
			delete observables[key] for own key of observables
			return
			
		
		setObservable = (name, observable) =>
			disposable = observable.connect()
			@__defineSetter__ name, (val) -> 
				disposable.dispose()
				disposable = (observable = val.publish()).connect()
				subjects[name] = observable
			subjects[name] = observables[name] = observable;
		
		setVal = (name, initial) =>
			latest = initial
			@__defineSetter__ name, (val) -> subjects[name].onNext latest = val
			subj = new Rx.BehaviorSubject(initial)
			subj.__defineGetter__ 'val', () -> latest
			subjects[name] = observables[name] = subj
	
	@inc: 1
	getUUID: () -> Math.round Math.random() * new Date().getTime() + ++Dictionary.inc, Math.pow 10, 10