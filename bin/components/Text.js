var Text;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Text = (function() {

  __extends(Text, UIElement);

  function Text() {
    Text.__super__.constructor.call(this);
    this.define('text', '');
    this.define('caret', 0);
    this.define('range', [0, 0]);
    this.define('skin', new HTMLTextSkin()).subscribe(this.onExtensionChanged());
  }

  return Text;

})();