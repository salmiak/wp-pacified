$(function(){

  // Settings:
  var settings = {
    rotation: 1.5,
    scale: 0.9,
    opacity: 0.4,
    offset: 3,
    headerHeight: 60
  }

  var $window = $(window);
  var scrollTO;
  var $currentElement;

  var centerStrip = function($element){

    var window_height = $window.height() - settings.headerHeight;
    var window_top_position = $window.scrollTop() + settings.headerHeight;
    var window_center_position = window_top_position + window_height/2;

    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_center_position = element_top_position + element_height/2;

    $('html, body').animate({scrollTop: element_center_position-window_height/2-settings.headerHeight}, 200);
  }

  var nextStrip = function(){
    var window_height = $window.height() - settings.headerHeight;

    var $nextElement = $currentElement.next();
    var next_element_height = $nextElement.outerHeight();
    var next_element_top_position = $nextElement.offset().top;
    var next_element_center_position = next_element_top_position + next_element_height/2;
    $('html, body').animate({scrollTop: next_element_center_position-window_height/2-settings.headerHeight}, 200);
  }

  var prevStrip = function(){
    var window_height = $window.height() - settings.headerHeight;

    var $nextElement = $currentElement.prev();
    var next_element_height = $nextElement.outerHeight();
    var next_element_top_position = $nextElement.offset().top;
    var next_element_center_position = next_element_top_position + next_element_height/2;
    $('html, body').animate({scrollTop: next_element_center_position-window_height/2-settings.headerHeight}, 200);
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    if( (  e.keyCode === 32 && !e.shiftKey) // Space (and not shift)
        || e.keyCode === 40 // Down arrow
        || e.keyCode === 39 // Right arrow
      ) {
      nextStrip();
      e.preventDefault();
    }
    if( (  e.keyCode === 32 && e.shiftKey) // Space + shift
        || e.keyCode === 38 // Up arrow
        || e.keyCode === 37 // Left arrow
      ) {
      prevStrip();
      e.preventDefault();
    }
};

  $window.on('scroll resize', function(){

    var window_height = $window.height() - settings.headerHeight;
    var window_top_position = $window.scrollTop() + settings.headerHeight;
    var window_bottom_position = (window_top_position + window_height);
    var window_center_position = window_top_position + window_height/2;

    var shortestDiff = 999;

    clearTimeout(scrollTO);

    $('.strip').each(function(){

      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
      var element_center_position = element_top_position + element_height/2;

      var scale, opacity;
      if( element_center_position >= window_top_position && element_center_position < window_center_position ) {
        var index = (element_center_position-window_top_position)/(window_height/2);
        scale = settings.scale + (1-settings.scale)*index;
        opacity = settings.opacity + (1-settings.opacity)*index;
      } else if( element_center_position <= window_bottom_position && element_center_position >= window_center_position ) {
        var index = (window_bottom_position-element_center_position)/(window_height/2);
        scale = settings.scale + (1-settings.scale)*index;
        opacity = settings.opacity + (1-settings.opacity)*index;
      } else {
        scale = settings.scale;
        opacity = settings.opacity;
      }

      var position_index =  (element_center_position-window_center_position)/(window_height/2)


      $element.find('img')
        .css('transform','scale3d('+scale+','+scale+',1) rotate3d(0,0,1,'+position_index*settings.rotation+'deg) translate3d(0,'+(position_index*settings.offset*-1)+'vh,0)')
        .parent().parent().css('opacity',opacity)
        .css('z-index',Math.round(scale*100));

      if( Math.abs(element_center_position-window_center_position) < shortestDiff) {
        shortestDiff = Math.abs(element_center_position-window_center_position);
        $currentElement = $element;
      }

    });

    scrollTO = setTimeout(function(){centerStrip($currentElement);}, 100);

  })

  $window.trigger('scroll');

})
