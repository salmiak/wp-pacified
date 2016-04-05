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

  var windowModel = {
    init: function(){
      this._top = 0;
      this._bottom = 0;
      this._center = 0;
      this._height = 0;
    },
    updateValues: function(){
      this._height = $window.height() - settings.headerHeight;
      this._top = $window.scrollTop() + settings.headerHeight;
      this._bottom = this._top + this._height;
      this._center = this._top + this._height/2;
    },
    getHeight: function(){
      return this._height;
    },
    getTop: function(){
      return this._top;
    },
    getBottom: function(){
      return this._bottom;
    },
    getCenter: function(){
      return this._center;
    }
  }
  windowModel.init();

  var getElementObject = function($element) {
    return {
      $el: $element,
      getId: function(){
        return this.$el.attr('id');
      },
      getElmentById: function(id){
        return getElementObject($('.strip#'+id));
      },
      getHeight: function(){
        return this.$el.outerHeight();
      },
      getTop: function(){
        return this.$el.offset().top;
      },
      getBottom: function(){
        return this.getTop() + this.getHeight();
      },
      getCenter: function(){
        return this.getTop() + this.getHeight()/2;
      },
      getStory: function(){
        return {
          name: this.$el.data('storyname'),
          slug: this.$el.data('storyslug')
        }
      },
      centerStrip: function(){
        $('html, body').animate({
          scrollTop: this.getCenter()-windowModel.getHeight()/2-settings.headerHeight
        }, 200);
        $('#StoryLabel').html(this.getStory().name)
        $('#StoryStartLink').attr('data-target', this.getStory().slug);
        return this;
      },
      goToId: function(id) {
        $currentElement = this.getElmentById(id).centerStrip();
      },
      goToNext: function(){
        var next = this.$el.next();
        if(next.length)
          $currentElement = getElementObject(next).centerStrip();
      },
      goToPrev: function(){
        var next = this.$el.prev();
        if(next.length)
          $currentElement = getElementObject(next).centerStrip();
      }
    }
  }

  $('#StoryStartLink').on('click', function(){
    var id = $('.strip[data-storyslug="'+$(this).attr('data-target')+'"]').attr('id');
    $currentElement.goToId(id);
    return false;
  })

  var centerStrip = function($element){
    $currentElement = getElementObject($element);
    $currentElement.centerStrip();
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    if( (  e.keyCode === 32 && !e.shiftKey) // Space (and not shift)
        || e.keyCode === 40 // Down arrow
        || e.keyCode === 39 // Right arrow
      ) {
      $currentElement.goToNext();
      e.preventDefault();
    }
    if( (  e.keyCode === 32 && e.shiftKey) // Space + shift
        || e.keyCode === 38 // Up arrow
        || e.keyCode === 37 // Left arrow
      ) {
      $currentElement.goToPrev();
      e.preventDefault();
    }
};

  $window.on('scroll resize', function(){

    windowModel.updateValues();

    var shortestDiff = 999;

    clearTimeout(scrollTO);

    $('.strip').each(function(){

      var $element = $(this);
      var elObj = getElementObject($element);

      var scale, opacity;
      if( elObj.getCenter() >= windowModel.getTop() && elObj.getCenter() < windowModel.getCenter() ) {
        var index = (elObj.getCenter()-windowModel.getTop())/(windowModel.getHeight()/2);
        scale = settings.scale + (1-settings.scale)*index;
        opacity = settings.opacity + (1-settings.opacity)*index;
      } else if( elObj.getCenter() <= windowModel.getBottom() && elObj.getCenter() >= windowModel.getCenter() ) {
        var index = (windowModel.getBottom()-elObj.getCenter())/(windowModel.getHeight()/2);
        scale = settings.scale + (1-settings.scale)*index;
        opacity = settings.opacity + (1-settings.opacity)*index;
      } else {
        scale = settings.scale;
        opacity = settings.opacity;
      }

      var position_index =  (elObj.getCenter()-windowModel.getCenter())/(windowModel.getHeight()/2)

      $element.find('img')
        .css('transform','scale3d('+scale+','+scale+',1) rotate3d(0,0,1,'+position_index*settings.rotation+'deg) translate3d(0,'+(position_index*settings.offset*-1)+'vh,0)')
        .parent().parent().css('opacity',opacity)
        .css('z-index',Math.round(scale*100));

      if( Math.abs(elObj.getCenter()-windowModel.getCenter()) < shortestDiff) {
        shortestDiff = Math.abs(elObj.getCenter()-windowModel.getCenter());
        $currentElement = getElementObject($element);
      }

    });

    scrollTO = setTimeout(function(){$currentElement.centerStrip();}, 100);

  })

  $window.trigger('scroll');

})
