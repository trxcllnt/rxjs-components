var Button;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Button = (function() {

  __extends(Button, UIElement);

  function Button() {
    var _this = this;
    Button.__super__.constructor.call(this);
    this.define('label', 'Button');
    this.define('toggle', false);
    this.define('selected', false);
    this.define('skin', null).subscribe(this.onExtensionChanged());
    this.toggle.subscribe(function(toggle) {
      return _this.skin = toggle ? new HTMLToggleButtonSkin() : new HTMLButtonSkin();
    });
  }

  return Button;

})();
