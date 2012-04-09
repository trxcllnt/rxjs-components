var UIElement;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

UIElement = (function() {

  __extends(UIElement, Dictionary);

  function UIElement() {
    UIElement.__super__.constructor.call(this);
    this.define('x', 0);
    this.define('y', 0);
    this.define('width', 0);
    this.define('height', 0);
    this.define('parent', null);
    this.define('index', -1);
  }

  UIElement.prototype.onExtensionChanged = function() {
    var extension;
    var _this = this;
    extension = null;
    return function(newExtension) {
      if (newExtension === extension) return;
      if ((extension != null) && (extension.element != null)) {
        extension.element.onCompleted();
      }
      if ((newExtension != null) && (newExtension.element != null)) {
        (extension = newExtension).element = _this;
      }
    };
  };

  return UIElement;

})();
