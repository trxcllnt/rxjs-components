var HTMLSkin;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HTMLSkin = (function() {

  __extends(HTMLSkin, Dictionary);

  function HTMLSkin() {
    var disposable, skin;
    var _this = this;
    HTMLSkin.__super__.constructor.call(this);
    this.define('element');
    skin = this.getSkin();
    disposable = Rx.Disposable.empty;
    this.element.where(function(e) {
      return e != null;
    }).subscribe((function(element) {
      var e;
      disposable.dispose();
      disposable = new Rx.CompositeDisposable();
      e = element;
      e.useObservable('parent', e.parent.where(function(p) {
        return p != null;
      }));
      e.useObservable('index', e.index.combineLatest(e.parent, function() {
        return arguments;
      }).where(function(ip) {
        return (function(i, p) {
          return i > -1 && i <= p.children().length;
        }).apply(null, ip);
      }).select(function(ip) {
        return ip[0];
      }));
      disposable.add(e.parent.takeUntil(e.index).subscribe(function(parent) {
        return e.index = parent.children().length;
      }));
      disposable.add.apply(null, _this.addListeners(element, skin));
      return disposable.add(element.parent.combineLatest(element.index, function() {
        return arguments;
      }).subscribe(function(pi) {
        return (function(p, i) {
          var len;
          len = p.children().length;
          if (len === 0) {
            return p.append(skin);
          } else {
            return $(p.children().get(Math.min(i - 1, len - 1))).after(skin);
          }
        }).apply(null, pi);
      }));
    }), null, (function() {
      disposable.dispose();
      disposable = null;
      skin.remove();
      return skin = null;
    }));
  }

  HTMLSkin.prototype.getSkin = function() {
    return $('<div></div>');
  };

  HTMLSkin.prototype.addListeners = function(element, skin) {
    return [];
  };

  return HTMLSkin;

})();
