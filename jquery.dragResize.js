(function() {
  (function($) {
    $.dragResize = {
      version: '1.0'
    };
    return $.fn.dragResize = function(options) {
      var default_options, enable_resize, parent_pos, parent_width, that;
      default_options = {
        resize: function(pageX, pageY) {},
        activeColor: "#AAA",
        inactiveColor: "#DDD",
        default_min_width: 50,
        left_min_width: -1,
        right_min_width: -1
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
      if (options.left_min_width === -1) {
        options.left_min_width = options.default_min_width;
      }
      if (options.right_min_width === -1) {
        options.right_min_width = options.default_min_width;
      }
      parent_width = $(this).parent().width();
      return $(window).mousemove(function(e) {
        if (enable_resize === true) {
          if (e.pageY < 0 || e.pageY > document.height || e.pageX < (parent_pos + options.left_min_width) || e.pageX > (parent_width + parent_pos - options.right_min_width)) {
            if (e.pageX < (parent_pos + options.left_min_width)) {
              return options.resize(options.left_min_width, e.pageY);
            } else if (e.pageX > (parent_width + parent_pos - options.right_min_width)) {
              return options.resize(parent_width - options.right_min_width, e.pageY);
            }
            enable_resize = false;
          }
          return options.resize(e.pageX - parent_pos, e.pageY);
        }
      });
    };
  })($);

}).call(this);
