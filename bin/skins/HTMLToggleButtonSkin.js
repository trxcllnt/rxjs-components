// Generated by CoffeeScript 1.3.1
var HTMLToggleButtonSkin,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HTMLToggleButtonSkin = (function(_super) {

  __extends(HTMLToggleButtonSkin, _super);

  HTMLToggleButtonSkin.name = 'HTMLToggleButtonSkin';

  function HTMLToggleButtonSkin() {
    return HTMLToggleButtonSkin.__super__.constructor.apply(this, arguments);
  }

  HTMLToggleButtonSkin.prototype.getSkin = function() {
    var checkbox, div, id, label;
    div = $('<div></div>');
    id = 'checkbox_' + this.getUUID().toString();
    checkbox = $('<input id="checkbox" type="checkbox"></input>');
    checkbox.prop('id', id);
    label = $('<label></label/>');
    label.prop('for', id);
    div.append(checkbox, label);
    return div;
  };

  HTMLToggleButtonSkin.prototype.addListeners = function(element, skin) {
    var checkbox, label;
    checkbox = $(skin.children().get(0));
    label = $(skin.children().get(1));
    return [
      element.toggle.combineLatest(element.selected, function(toggle, selected) {
        return toggle && selected;
      }).subscribe(function(selected) {
        return checkbox.checked = selected;
      }), element.label.subscribe(function(str) {
        return label.text(str);
      }), checkbox.changeAsObservable().subscribe(function() {
        return element.selected = !checkbox.checked;
      })
    ];
  };

  return HTMLToggleButtonSkin;

})(HTMLSkin);
