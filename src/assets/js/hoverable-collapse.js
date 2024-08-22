(function($) {
  'use strict';
  //Open submenu on hover in compact sidebar mode and horizontal menu mode
  $(document).on('mouseenter mouseleave', '.sidebar', function(ev) {
    var body = $('body');
    var sidebarIconOnly = body.hasClass("sidebar-icon-only");
    var sidebarFixed = body.hasClass("sidebar-fixed");
    var sidebarToggleClass = body.hasClass("toggleCustom");

    if (!('ontouchstart' in document.documentElement)) {
      if (sidebarToggleClass) {
        if (sidebarFixed) {
          if (ev.type === 'mouseenter') {
            body.removeClass('sidebar-icon-only');
          }
        } else {
          var $menuItem = $(this);
          if (ev.type === 'mouseenter') {
            // $menuItem.addClass('hover-open')
            body.removeClass('sidebar-icon-only')
            // if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            //   body.toggleClass('sidebar-hidden');
            // } else {
            //   body.toggleClass('sidebar-icon-only');
            // }
          } else {
            //$menuItem.removeClass('hover-open')
            body.addClass('sidebar-icon-only')
            // if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            //   body.toggleClass('sidebar-hidden');
            // } else {
            //   body.toggleClass('sidebar-icon-only');
            // }
          }
        }
      }
    }
  });
})(jQuery);
