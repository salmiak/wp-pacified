var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

if(!mobilecheck()) {
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
    var isCenteringStrip;
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
      if(!$element || !$element.length)
        return false;
      return {
        $el: $element,
        getId: function(){
          return this.$el.attr('id');
        },
        getElmentById: function(id){
          return getElementObject($('#'+id));
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
            slug: this.$el.data('storyslug'),
            description: this.$el.data('storydesc')
          }
        },
        setCurrent: function(){
          $('#StoryLabel').html(this.getStory().name);
          $('#StoryStartLink').attr('data-target', this.getStory().slug);
          $('#StoryDescription').html(this.getStory().description);
          $('body').attr('data-background', this.$el.attr('data-background'));
          setCookie('pac_lastVisited',this.getId(), 999);
        },
        centerStrip: function(){
          isCenteringStrip = true;
          $('html, body').animate({
            scrollTop: Math.floor(this.getCenter()-windowModel.getHeight()/2-settings.headerHeight*1.1)
          }, 200, function(){
            $('body > .loading').addClass('disabled');
            isCenteringStrip = false;
          });
          this.setCurrent();
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
    });


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

      if(!isCenteringStrip) {
        scrollTO = setTimeout(function(){
          $currentElement.centerStrip();
        }, 100);
      }

    })

    $window.on('load', function(){ $window.trigger('scroll'); });

    $window.on('load', function(){
      $currentElement = getElementObject($('.strip').last());
      /*
      if (pacified_start_id) {
        var start_target = $('#'+pacified_start_id).first();
        if(start_target.length) {
          $currentElement = getElementObject(start_target);
        }
      }
      */
      $currentElement.centerStrip();
    })

  })
} else {
  $(function(){
    $('body > .loading').addClass('disabled');
  })
}
