# JQuery DragResize
#
# Version: 1.0
# Author: Shiv Deepak <shiv@interviewstreet.com>
# Date: 25 Sept 2012

(($) ->
  $.dragResize = {version: '1.0'}
  $.fn.dragResize = (options) ->
    default_options = {
      resize: (pageX, pageY) ->
      activeColor: "#AAA"
      inactiveColor: "#DDD"
      default_min_width: 50
      left_min_width: -1
      right_min_width: -1
    }
    that = @
    options = $.extend(default_options, options)
    enable_resize = false

    $(@).mousedown (e) ->
      enable_resize = true
      return false

    $(document).mouseup (e) ->
      enable_resize = false

    $(@).mouseenter (e) ->
      $(that).css('background-color', options.activeColor)

    $(@).mouseleave (e) ->
      $(that).css('background-color', options.inactiveColor)

    $(window).mouseout (e) ->
      if e.relatedTarget == null
        enable_resize = false
    
    parent_pos=$(@).parent().position()
    parent_pos=parent_pos.left
    if options.left_min_width is -1
    	options.left_min_width=options.default_min_width
    if options.right_min_width is -1
    	options.right_min_width=options.default_min_width
    parent_width=$(@).parent().width()
    $(window).mousemove (e) -> 
      if enable_resize == true
        if e.pageY < 0 or e.pageY > document.height or e.pageX < (parent_pos + options.left_min_width) or e.pageX > (parent_width+parent_pos-options.right_min_width)
          if e.pageX < (parent_pos + options.left_min_width)
            return options.resize(options.left_min_width, e.pageY)
          else if e.pageX > (parent_width+parent_pos-options.right_min_width)
            return options.resize(parent_width-options.right_min_width, e.pageY)
          enable_resize = false
        options.resize(e.pageX-parent_pos, e.pageY)
) $
