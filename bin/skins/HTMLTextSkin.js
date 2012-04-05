var HTMLTextSkin;

HTMLTextSkin = (function() {

  function HTMLTextSkin() {
    var disposable, paragraph;
    paragraph = $('<p></p>');
    disposable = Rx.Disposable.empty;
    this.register = function(element) {
      disposable.dispose();
      if (!(element != null)) return;
      disposable = new Rx.CompositeDisposable();
      disposable.add(element.text.subscribe(function(text) {
        return paragraph.text(text);
      }));
      disposable.add(element.parent.subscribe(function(parent) {
        return parent.append(paragraph);
      }));
    };
  }

  return HTMLTextSkin;

})();
