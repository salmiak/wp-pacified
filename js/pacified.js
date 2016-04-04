$(function(){

  var $window = $(window);

  $window.on('scroll resize', function(){

    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    var window_center_position = window_top_position + window_height/2;

    $('.strip').each(function(){

      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
      var element_center_position = element_top_position + element_height/2;

      var scale;
      if( element_center_position >= window_top_position && element_center_position < window_center_position ) {
        var index = (element_center_position-window_top_position)/(window_height/2);
        scale = 0.7 + 0.3*index;
      } else if( element_center_position <= window_bottom_position && element_center_position >= window_center_position ) {
        var index = (window_bottom_position-element_center_position)/(window_height/2);
        scale = 0.7 + 0.3*index;
      } else {
        scale = 0.7;
      }

      var position_index =  (element_center_position-window_center_position)/(window_height/2)


      $element.find('img')
        .css('transform','scale3d('+scale+','+scale+',1) rotate3d(0,0,1,'+position_index*1.5+'deg) translate3d(0,'+(position_index*-9)+'vh,0)')
        .css('z-index',Math.round(scale*100))
        .css('opacity',scale);

    });
  })

  $window.trigger('scroll');

})
