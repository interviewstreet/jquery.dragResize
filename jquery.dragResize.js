(function() {
  (function($) {
    $.dragResize = {
      version: '1.0'
    };
    return $.fn.dragResize = function(options) {
      var default_options, enable_resize, min_width, parent_pos, parent_width, that;
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
      $(document).mouseup(function(e) {
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
      parent_pos = $(this).parent().position();
      parent_pos = parent_pos.left;
      min_width = 50;
      parent_width = $(this).parent().width();
      return $(window).mousemove(function(e) {
        if (enable_resize === true) {
          if (e.pageY < 0 || e.pageY > document.height || e.pageX < (parent_pos + min_width) || e.pageX > (parent_width + parent_pos - min_width)) {
            if (e.pageX < (parent_pos + min_width)) {
              return options.resize(min_width, e.pageY);
            } else if (e.pageX > (parent_width + parent_pos - min_width)) {
              return options.resize(parent_width - min_width, pageY);
            }
            enable_resize = false;
          }
          return options.resize(e.pageX - parent_pos, e.pageY);
        }
      });
    };
  })($);

}).call(this);
