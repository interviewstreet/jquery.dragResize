(function() {
  (function($) {
    $.dragResize = {
      version: '1.0'
    };
    return $.fn.dragResize = function(options) {
      var default_options, enable_resize, that;
      default_options = {
        resize: function(pageX, pageY) {},
        activeColor: "#AAA",
        inactiveColor: "#DDD"
      };
      that = this;
      options = $.extend(default_options, options);
      enable_resize = false;
      $(this).mousedown(function(e) {
        enable_resize = true;
        return false;
      });
      $(this).mouseup(function(e) {
        return enable_resize = false;
      });
      $(this).mouseenter(function(e) {
        return $(that).css('background-color', options.activeColor);
      });
      $(this).mouseleave(function(e) {
        return $(that).css('background-color', options.inactiveColor);
      });
      $(window).mouseout(function(e) {
        if (e.relatedTarget === null) {
          return enable_resize = false;
        }
      });
      return $(window).mousemove(function(e) {
        if (enable_resize === true) {
          if (e.pageY < 0 || e.pageY > document.height || e.pageX < 0 || e.pageX > document.width) {
            enable_resize = false;
          }
          return options.resize(e.pageX, e.pageY);
        }
      });
    };
  })($);

}).call(this);
