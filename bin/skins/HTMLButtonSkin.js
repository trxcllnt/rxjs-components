var HTMLButtonSkin;

HTMLButtonSkin = (function() {

  function HTMLButtonSkin() {
    var button, disposable;
    button = $('<button></button>');
    disposable = Rx.Disposable.empty;
    this.register = function(element) {
      disposable.dispose();
      if (!(element != null)) return;
      disposable = new Rx.CompositeDisposable();
      disposable.add(element.label.subscribe(function(text) {
        return button.text(text);
      }));
      disposable.add(element.parent.subscribe(function(parent) {
        return parent.append(button);
      }));
    };
  }

  return HTMLButtonSkin;

})();
