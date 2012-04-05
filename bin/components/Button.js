var Button;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Button = (function() {

  __extends(Button, UIElement);

  function Button() {
    Button.__super__.constructor.call(this);
    this.define('label', 'Button');
    this.define('skin', new HTMLButtonSkin()).subscribe(this.onExtensionChanged());
  }

  return Button;

})();
