var HTMLTextSkin;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HTMLTextSkin = (function() {

  __extends(HTMLTextSkin, HTMLSkin);

  function HTMLTextSkin() {
    HTMLTextSkin.__super__.constructor.apply(this, arguments);
  }

  HTMLTextSkin.prototype.getSkin = function() {
    return $('<p></p>');
  };

  HTMLTextSkin.prototype.addListeners = function(element, skin) {
    return [
      element.text.subscribe(function(text) {
        return skin.text(text);
      })
    ];
  };

  return HTMLTextSkin;

})();
