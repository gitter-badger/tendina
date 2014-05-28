
/*
Tendina jQuery plugin v0.1.2

Copyright (c) 2014 Ivan Prignano
Released under the MIT License
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  (function($, window) {
    var Tendina;
    Tendina = (function() {
      Tendina.prototype.defaults = {
        animate: true,
        speed: 500
      };

      function Tendina(el, options) {
        this.clickHandler = __bind(this.clickHandler, this);
        this.options = $.extend({}, this.defaults, options);
        this.checkOptions();
        $(el).addClass('tendina');
        this.firstLvlSubmenu = ".tendina > li";
        this.secondLvlSubmenu = ".tendina > li > ul > li";
        this.firstLvlSubmenuLink = "" + this.firstLvlSubmenu + " > a";
        this.secondLvlSubmenuLink = "" + this.secondLvlSubmenu + " > a";
        this.hideSubmenusOnStartup();
        this.bindEvents();
      }

      Tendina.prototype.bindEvents = function() {
        return $(document).on('click', "" + this.firstLvlSubmenuLink + ", " + this.secondLvlSubmenuLink, this.clickHandler);
      };

      Tendina.prototype.isFirstLevel = function(clickedEl) {
        if ($(clickedEl).parent().parent().hasClass('tendina')) {
          return true;
        }
      };

      Tendina.prototype.clickHandler = function(event) {
        var clickedEl, submenuLevel;
        clickedEl = event.currentTarget;
        submenuLevel = this.isFirstLevel(clickedEl) ? this.firstLvlSubmenu : this.secondLvlSubmenu;
        if (this.hasChildenAndIsHidden(clickedEl)) {
          event.preventDefault();
          return this.openSubmenu(submenuLevel, clickedEl);
        } else if (this.isCurrentlyOpen(clickedEl)) {
          event.preventDefault();
          return this.closeSubmenu(clickedEl);
        }
      };

      Tendina.prototype.openSubmenu = function(el, clickedEl) {
        var $clickedNestedMenu, $firstNestedMenu, $lastNestedMenu;
        $firstNestedMenu = $(el).find('> ul');
        $lastNestedMenu = $(el).find('> ul > li > ul');
        $clickedNestedMenu = $(clickedEl).next('ul');
        $(el).removeClass('selected');
        $(clickedEl).parent().addClass('selected');
        this.close($firstNestedMenu);
        this.open($clickedNestedMenu);
        if (el === this.firstLvlSubmenu) {
          $(el).find('> ul > li').removeClass('selected');
          return this.close($lastNestedMenu);
        }
      };

      Tendina.prototype.closeSubmenu = function(el) {
        var $clickedNestedMenu;
        $clickedNestedMenu = $(el).next('ul');
        $(el).parent().removeClass('selected');
        return this.close($clickedNestedMenu);
      };

      Tendina.prototype.open = function($el) {
        if (this.options.animate) {
          return $el.slideDown(this.options.speed);
        } else {
          return $el.show();
        }
      };

      Tendina.prototype.close = function($el) {
        if (this.options.animate) {
          return $el.slideUp(this.options.speed);
        } else {
          return $el.hide();
        }
      };

      Tendina.prototype.hasChildenAndIsHidden = function(el) {
        return $(el).next('ul').length > 0 && $(el).next('ul').is(':hidden');
      };

      Tendina.prototype.isCurrentlyOpen = function(el) {
        return $(el).parent().hasClass('selected');
      };

      Tendina.prototype.hideSubmenusOnStartup = function() {
        return $("" + this.firstLvlSubmenu + " > ul, " + this.secondLvlSubmenu + " > ul").hide();
      };

      Tendina.prototype.checkOptions = function() {
        if (this.options.animate !== true || false) {
          console.warn("jQuery.fn.Tendina - '" + this.options.animate + "' is not a valid parameter for the 'animate' option. Falling back to default value.");
        }
        if (this.options.speed !== parseInt(this.options.speed)) {
          return console.warn("jQuery.fn.Tendina - '" + this.options.speed + "' is not a valid parameter for the 'speed' option. Falling back to default value.");
        }
      };

      return Tendina;

    })();
    return $.fn.extend({
      tendina: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('tendina');
          if (!data) {
            return $this.data('tendina', (data = new Tendina(this, option)));
          }
        });
      }
    });
  })(window.jQuery, window);

}).call(this);
