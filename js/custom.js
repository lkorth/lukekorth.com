(function() {
  jQuery(window).scroll(function() {
    var oVal;
    oVal = jQuery(window).scrollTop() / 400;
    if(oVal > 1) {
      oVal = 1;
    }

    return jQuery("#bg_blurred").css("opacity", oVal);
  });

}).call(this);

(function() {
  jQuery(window).scroll(function() {
    var oVal;
    oVal = jQuery(window).scrollTop() / 140;
    if(oVal > 1) {
      oVal = 1;
    }
    oVal = parseFloat(1-oVal);

    return jQuery("#page_caption.hasbg .page_title_wrapper .page_title_inner").css("opacity", oVal);
  });

}).call(this);

jQuery(document).ready(function(){
  "use strict";

  jQuery(document).setNav();

  jQuery(window).resize(function(){
    jQuery(document).setNav();
  });

  jQuery('.fancy_video, .lightbox_vimeo, .lightbox_youtube').magnificPopup({
    src: jQuery(this).attr('href'),
    type: 'inline',
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });

  jQuery('a.fancy-gallery, .pp_gallery a, .woocommerce-product-gallery__image a').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery:{
      enabled:true
    }
  });

  jQuery('.img_frame').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });

  jQuery('#menu_expand_wrapper a').on( 'click', function(){
    jQuery('#menu_wrapper').fadeIn();
    jQuery('#custom_logo').animate({'left': '15px', 'opacity': 1}, 400);
    jQuery('#menu_close').animate({'left': '-10px', 'opacity': 1}, 400);
    jQuery(this).animate({'left': '-60px', 'opacity': 0}, 400);
    jQuery('#menu_border_wrapper select').animate({'left': '0', 'opacity': 1}, 400).fadeIn();
  });

  jQuery('#menu_close').on( 'click', function(){
    jQuery('#custom_logo').animate({'left': '-200px', 'opacity': 0}, 400);
    jQuery(this).stop().animate({'left': '-200px', 'opacity': 0}, 400);
    jQuery('#menu_expand_wrapper a').animate({'left': '20px', 'opacity': 1}, 400);
    jQuery('#menu_border_wrapper select').animate({'left': '-200px', 'opacity': 0}, 400).fadeOut();
    jQuery('#menu_wrapper').fadeOut();
  });

  // Isotope
  // modified Isotope methods for gutters in masonry
  jQuery.Isotope.prototype._getMasonryGutterColumns = function() {
    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
    var containerWidth = this.element.width();

    this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
      // or use the size of the first item
      this.$filteredAtoms.outerWidth(true) ||
      // if there's no items, use size of container
      containerWidth;

    this.masonry.columnWidth += gutter;

    this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
    this.masonry.cols = Math.max( this.masonry.cols, 1 );
  };

  jQuery.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getMasonryGutterColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  jQuery.Isotope.prototype._masonryResizeChanged = function() {
    var prevSegments = this.masonry.cols;
    // update cols/rows
    this._getMasonryGutterColumns();
    // return if updated cols/rows is not equal to previous
    return ( this.masonry.cols !== prevSegments );
  };

  // cache jQuery window
  var $window = jQuery(window);

  // filter items when filter link is clicked
  var dropdowns = jQuery(".portfolio_filter_dropdown");

  dropdowns.find(".portfolio_filter_dropdown_title").on( 'click', function(){
    dropdowns.find(".portfolio_filter_dropdown_select ul.portfolio_select").hide();
    jQuery(this).next().children().toggle();
  });

  dropdowns.find(".portfolio_filter_dropdown_select ul.portfolio_select li a").on( 'click', function(){
    var leSpan = jQuery(this).parents(".portfolio_filter_dropdown").find(".portfolio_filter_dropdown_title a span");

    jQuery(this).parents(".portfolio_filter_dropdown").find('.portfolio_filter_dropdown_select a').each(function(){
      jQuery(this).removeClass('selected');
    });

    leSpan.html(jQuery(this).html());

    if(jQuery(this).hasClass('default'))
    {
      leSpan.removeClass('selected')
    }
    else
    {
      leSpan.addClass('selected');
      jQuery(this).addClass('selected');
    }

    jQuery(this).parents("ul").hide();
  });

  // Close all dropdown onclick on another element
  jQuery(document).bind('click', function(e){
    if (! jQuery(e.target).parents().hasClass("portfolio_filter_dropdown")) jQuery(".portfolio_filter_dropdown .portfolio_filter_dropdown_select ul.portfolio_select").hide();
  });


  function reLayout() {
    var jQuerycontainer = jQuery('#photo_wall_wrapper, .photo_wall_wrapper');
    var windowWidth = parseInt(jQuerycontainer.width());
    var jQueryportfolioColumn = 4;
    var columnValue;
    var masonryOpts;

    if(windowWidth < 480)
    {
      jQueryportfolioColumn = 1;
    }
    else if(windowWidth >= 480 && windowWidth < 960)
    {
      jQueryportfolioColumn = 2;
    }
    else if(windowWidth >= 960 && windowWidth < 1400)
    {
      jQueryportfolioColumn = 4;
    }
    else if(windowWidth >= 1400 && windowWidth < 2100)
    {
      jQueryportfolioColumn = 5;
    }
    else if(windowWidth >= 2100)
    {
      jQueryportfolioColumn = 6;
    }

    if(windowWidth > 480)
    {
      columnValue = windowWidth / jQueryportfolioColumn;
    }
    else if(windowWidth <= 480)
    {
      columnValue = 480;
    }

    masonryOpts = {
      columnWidth: columnValue
    };

    $container.addClass('visible');

    $container.isotope({
      resizable: false,
      itemSelector : '.wall_entry',
      masonry: masonryOpts
    }).isotope();

  }

  var $container = jQuery('#photo_wall_wrapper, .photo_wall_wrapper');

  // start up isotope with default settings
  $container.imagesLoaded( function(){
    reLayout();
    $window.smartresize(reLayout);

    $container.children('.wall_entry').children('.gallery_type').each(function(){
      jQuery(this).addClass('fade-in');
    });

    $container.children('.wall_entry').mouseenter(function(){
      //$container.children('.wall_entry').addClass('fade');
      //jQuery(this).removeClass('fade');
      jQuery(this).addClass('hover');
    });

    $container.children('.wall_entry').mouseleave(function(){
      //$container.children('.wall_entry').removeClass('fade');
      $container.children('.wall_entry').removeClass('hover');
    });
  });

  jQuery(window).resize(function() {
    if(jQuery(this).width() < 768)
    {
      jQuery('#menu_expand_wrapper a').trigger('click');
    }
  });

  function rePortfolioLayout() {
    var jQuerycontainer = jQuery('#portfolio_filter_wrapper');
    var windowWidth = jQuerycontainer.width();
    var jQueryportfolioColumn = jQuerycontainer.data('columns');
    var columnValue;
    var masonryOpts;

    if(windowWidth > 959)
    {
      columnValue = parseInt(windowWidth / jQueryportfolioColumn);
    }
    else if(windowWidth < 959 && windowWidth > 480)
    {
      columnValue = parseInt(windowWidth / jQueryportfolioColumn);
    }
    else if(windowWidth <= 480)
    {
      columnValue = 480;
    }

    masonryOpts = {
      columnWidth: columnValue
    };

    jQuerycontainer.isotope({
      resizable: false,
      itemSelector : '.element',
      masonry: masonryOpts
    } ).isotope();

  }

  // cache jQuery window
  var $window = jQuery(window);

  // cache container
  var jQuerycontainer = jQuery('#portfolio_filter_wrapper');

  // start up isotope with default settings
  jQuerycontainer.imagesLoaded( function(){
    rePortfolioLayout();
    $window.smartresize( rePortfolioLayout );

    jQuerycontainer.children('.element').children('.gallery_type').each(function(){
      jQuery(this).addClass('fadeIn');
    });

    jQuerycontainer.children('.element').children('.portfolio_type').each(function(){
      jQuery(this).addClass('fadeIn');
    });

    jQuerycontainer.children('.element').mouseenter(function(){
      //jQuerycontainer.children('.element').addClass('fade');
      //jQuery(this).removeClass('fade');
      jQuery(this).addClass('hover');
    });

    jQuerycontainer.children('.element').mouseleave(function(){
      //jQuerycontainer.children('.element').removeClass('fade');
      jQuerycontainer.children('.element').removeClass('hover');
    });

    jQuery(this).addClass('visible');
  });

  function reBlogLayout() {
    var windowWidth = jQuery(window).width();
    var jQueryblogcontainer = jQuery('#blog_grid_wrapper, .blog_grid_wrapper');
    var containerWidth = jQuery('#blog_grid_wrapper, .blog_grid_wrapper').width();

    var $blogGridColumn = 3;
    var columnValue = 0;
    var masonryOpts;
    if(containerWidth >= 960)
    {
      columnValue = containerWidth / $blogGridColumn;
    }
    else if(containerWidth < 960 && containerWidth >= 660)
    {
      columnValue = containerWidth / 2;
    }
    else
    {
      columnValue = containerWidth/1;
    }

    //alert($blogGridColumn);
    masonryOpts = {
      columnWidth: columnValue
    };

    jQueryblogcontainer.isotope({
      resizable: false, // disable resizing by default, we'll trigger it manually
      itemSelector : '.status-publish',
      masonry: masonryOpts
    } ).isotope();
  }

  var jQueryblogcontainer = jQuery('#blog_grid_wrapper, .blog_grid_wrapper');

  jQueryblogcontainer.imagesLoaded( function(){
    reBlogLayout();
    $window.smartresize( reBlogLayout );
  });

  //Add to top button when scrolling
  jQuery(window).scroll(function() {
    var calScreenWidth = jQuery(window).width();

    if(jQuery(this).scrollTop() > 200) {
      jQuery('#toTop').stop().css({opacity: 0.5, "visibility": "visible"}).animate({"visibility": "visible"}, {duration:1000,easing:"easeOutExpo"});
    } else if(jQuery(this).scrollTop() == 0) {
      jQuery('#toTop').stop().css({opacity: 0, "visibility": "hidden"}).animate({"visibility": "hidden"}, {duration:1500,easing:"easeOutExpo"});
    }
  });

  jQuery('#toTop, .hr_totop').on( 'click', function() {
    jQuery('body,html').animate({scrollTop:0},800);
  });

  var topBarHeight = parseInt(jQuery('.header_style_wrapper').height()-jQuery('.header_style_wrapper .above_top_bar').height());
  var logoHeight = jQuery('#custom_logo img').height();
  var logoTransHeight = jQuery('#custom_logo_transparent img').height();
  var logoMargin = parseInt(jQuery('#custom_logo').css('marginTop'));
  var logoTransMargin = parseInt(jQuery('#custom_logo_transparent').css('marginTop'));
  var menuPaddingTop = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingTop'));
  var menuPaddingBottom = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingBottom'));
  var SearchPaddingTop = parseInt(jQuery('.top_bar #searchform button').css('paddingTop'));

  jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');

  jQuery(window).resize(function() {
    if(jQuery(this).width() > 768) {
      var resizedTopBarHeight = parseInt(jQuery('.top_bar').height()+jQuery('.header_style_wrapper .above_top_bar').height());

      jQuery('#wrapper').css('paddingTop', resizedTopBarHeight+'px');
      jQuery('#page_content_wrapper.split, .page_content_wrapper.split').css('top', resizedTopBarHeight+'px');
      jQuery('.logo_wrapper').css('marginTop', '');
      jQuery('.top_bar #searchform button').css('paddingTop', '');
    } else {
      jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
    }

    jQuery('#page_caption.split').css('height', jQuery(window).height()+'px');
  });

  jQuery('#page_content_wrapper.split, .page_content_wrapper.split').css('top', parseInt(topBarHeight+jQuery('.header_style_wrapper .above_top_bar').height())+'px');
  jQuery('#page_content_wrapper.split, .page_content_wrapper.split').css('paddingBottom', parseInt(topBarHeight+jQuery('.header_style_wrapper .above_top_bar').height())+'px');
  jQuery('#page_caption.split').css('top', parseInt(topBarHeight+jQuery('.header_style_wrapper .above_top_bar').height())+'px');
  jQuery('#imageFlow').css('top', parseInt(topBarHeight+jQuery('.header_style_wrapper .above_top_bar').height()+50)+'px');

  jQuery(window).scroll(function() {
    if(jQuery(this).scrollTop() >= 200){
      jQuery('.header_style_wrapper .above_top_bar').hide();
      jQuery('.extend_top_contact_info').hide();

      jQuery('.top_bar').addClass('scroll dark');
      jQuery('#custom_logo').addClass('hidden');
      jQuery('#custom_logo_transparent').removeClass('hidden');

      if(jQuery('.top_bar').hasClass('hasbg')) {
        jQuery('.top_bar').removeClass('hasbg');
        jQuery('.top_bar').data('hasbg', 1);
      }

      if(jQuery(window).width()>960) {
        jQuery('#mobile_nav_icon').hide();
      }
    } else if(jQuery(this).scrollTop() < 200) {
      jQuery('.header_style_wrapper .above_top_bar').show();
      jQuery('.extend_top_contact_info').show();

      jQuery('#custom_logo img').removeClass('zoom');
      jQuery('#custom_logo img').css('maxHeight', '');
      jQuery('#custom_logo_transparent img').removeClass('zoom');

      jQuery('#custom_logo').css('marginTop', parseInt(logoMargin)+'px');
      jQuery('#custom_logo_transparent').css('marginTop', parseInt(logoTransMargin)+'px');

      jQuery('#menu_wrapper div .nav > li > a').css('paddingTop', menuPaddingTop+'px');
      jQuery('#menu_wrapper div .nav > li > a').css('paddingBottom', menuPaddingBottom+'px');;

      if(jQuery('.top_bar').data('hasbg')==1) {
        jQuery('.top_bar').addClass('hasbg');
        jQuery('#custom_logo').addClass('hidden');
        jQuery('#custom_logo_transparent').removeClass('hidden');
      }

      jQuery('.top_bar').removeClass('scroll dark');
      jQuery('#custom_logo').removeClass('hidden');
      jQuery('#custom_logo_transparent').addClass('hidden');
      jQuery('#mobile_nav_icon').show();
    }
  });

  jQuery('.post_img img').imagesLoaded(function(){
    jQuery(this).parent('.post_img').addClass('fadeIn');
  });

  jQuery(document).mouseenter(function()
    {
      jQuery('body').addClass('hover');
    });

  jQuery(document).mouseleave(function()
    {
      jQuery('body').removeClass('hover');
    });

  jQuery('#post_more_close').on( 'click', function(){
    jQuery('#post_more_wrapper').animate({ right: '-380px' }, 300);

    return false;
  });

  jQuery('#mobile_nav_icon').on( 'click', function() {
    jQuery('body,html').animate({scrollTop:0},100);
    jQuery('body').toggleClass('js_nav');

    if(is_touch_device())
    {
      jQuery('body.js_nav').css('overflow', 'auto');
    }
  });

  jQuery('.close_alert').on( 'click', function() {
    var target = jQuery(this).data('target');
    jQuery('#'+target).fadeOut();
  });

  jQuery('.post_share').on( 'click', function() {
    var targetShareID = jQuery(this).attr('data-share');
    var targetParentID = jQuery(this).attr('data-parent');

    jQuery(this).toggleClass('visible');
    jQuery('#'+targetShareID).toggleClass('slideUp');
    jQuery('#'+targetParentID).toggleClass('sharing');

    return false;
  });

  jQuery('.skin_box').on( 'click', function(){
    jQuery('.skin_box').removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery('#skin').val(jQuery(this).attr('data-color'));
  });

  jQuery('#demo_apply').on( 'click', function(){
    jQuery('#ajax_loading').addClass('visible');
    jQuery('body').addClass('loading');
    jQuery("form#form_option").submit();
  });

  jQuery('#option_wrapper').mouseenter(function()
    {
      jQuery('body').addClass('overflow_hidden');
    });

  jQuery('#option_wrapper').mouseleave(function()
    {
      jQuery('body').removeClass('overflow_hidden');
    });

  var calScreenHeight = jQuery(window).height()-108;
  var miniRightPos = 800;

  var cols = 3
  var masonry = jQuery('.gallery_mansory_wrapper');

  // initialize masonry
  masonry.imagesLoaded(function(){

    masonry.masonry({
      itemSelector: '.mansory_thumbnail',
      isResizable: true,
      isAnimated: true,
      isFitWidth: true,
      columnWidth:Math.floor((masonry.width()/ cols))
    });

    masonry.children('.mansory_thumbnail').children('.gallery_type').each(function(){
      jQuery(this).addClass('fade-in');
    });
  });

  jQuery(window).resize(function(){
    var masonry = jQuery('.gallery_mansory_wrapper');

    masonry.imagesLoaded(function(){

      masonry.masonry({
        itemSelector: '.mansory_thumbnail',
        isResizable: true,
        isAnimated: true,
        isFitWidth: true,
        columnWidth:Math.floor((masonry.width()/ cols))
      });

      masonry.children('.mansory_thumbnail').children('.gallery_type').each(function(){
        jQuery(this).addClass('fade-in');
      });
    });
  });

  function launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  jQuery('#page_maximize').click(function(){
    launchFullscreen(document.documentElement);
    jQuery(this).hide();
    jQuery('#page_minimize').show();
  });

  jQuery('#page_minimize').click(function(){
    exitFullscreen();
    jQuery('#page_maximize').show();
    jQuery(this).hide();
  });

  jQuery('#overlay_background').on( 'click', function() {
    jQuery('body').removeClass('js_nav');
  });

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || is_touch_device())
  {
    jQuery('.parallax').each(function(){
      var dataImgURL = jQuery(this).data('image');
      if(jQuery.type(dataImgURL) != "undefined")
      {
        jQuery(this).css('background-image', 'url('+dataImgURL+')');
        jQuery(this).css('background-size', 'cover');
        jQuery(this).css('background-position', 'center center');
      }
    });
  }
  else
  {
    jQuery('.parallax').parallax();

    jQuery(window).resize(function(){
      jQuery('.parallax').each(function(){
        var parallaxHeight = jQuery(this).data('content-height');
        parallaxHeight = parseInt((parallaxHeight/100)*jQuery(window).height());

        jQuery(this).css('height', parallaxHeight+'px');
      });

      jQuery(window).trigger('hwparallax.reconfigure');
    });
  }

  if(jQuery('.one.fullwidth.slideronly').length > 0) {
    jQuery('body').addClass('overflow_hidden');
  }
});

jQuery(window).on('resize load',adjustIframes);
