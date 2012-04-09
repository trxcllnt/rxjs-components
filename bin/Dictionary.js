var Dictionary;

Dictionary = (function() {

  function Dictionary() {
    var observables, setObservable, setVal, subjects;
    var _this = this;
    observables = {};
    subjects = {};
    this.define = function(name, initial) {
      _this.__defineGetter__(name, function() {
        return observables[name];
      });
      if (initial !== void 0 && (initial instanceof Rx.Observable)) {
        return setObservable(name, initial.publish());
      } else {
        return setVal(name, initial);
      }
    };
    this.useObservable = function(name, observable) {
      return observables[name] = observable;
    };
    setObservable = function(name, observable) {
      var disposable;
      disposable = observable.connect();
      _this.__defineSetter__(name, function(val) {
        disposable.dispose();
        disposable = (observable = val.publish()).connect();
        return subjects[name] = observable;
      });
      return subjects[name] = observables[name] = observable;
    };
    setVal = function(name, initial) {
      _this.__defineSetter__(name, function(val) {
        return subjects[name].onNext(val);
      });
      return subjects[name] = observables[name] = new Rx.BehaviorSubject(initial);
    };
  }

  Dictionary.inc = 1;

  Dictionary.prototype.getUUID = function() {
    return Math.round(Math.random() * new Date().getTime() + ++Dictionary.inc, Math.pow(10, 10));
  };

  return Dictionary;

})();
