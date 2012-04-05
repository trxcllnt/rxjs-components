var Dictionary;

Dictionary = (function() {

  function Dictionary() {
    var setObservable, setVal, subjects;
    var _this = this;
    subjects = {};
    this.define = function(name, initial) {
      if (initial !== void 0 && (initial instanceof Rx.Observable)) {
        setObservable(name, initial.publish());
      }
      if (initial === void 0 || (initial instanceof Rx.Observable) === false) {
        setVal(name, initial);
      }
      _this.__defineGetter__(name, function() {
        return subjects[name];
      });
      return _this[name];
    };
    setObservable = function(name, observable) {
      var disposable;
      disposable = observable.connect();
      _this.__defineSetter__(name, function(val) {
        disposable.dispose();
        disposable = (observable = val.publish()).connect();
        subjects[name] = observable;
      });
    };
    setVal = function(name, initial) {
      subjects[name] = new Rx.BehaviorSubject(initial);
      _this.__defineSetter__(name, function(val) {
        subjects[name].onNext(val);
      });
    };
  }

  return Dictionary;

})();
