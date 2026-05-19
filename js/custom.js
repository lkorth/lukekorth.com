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

  var logoMargin = parseInt(jQuery('#custom_logo').css('marginTop'));
  var logoTransMargin = parseInt(jQuery('#custom_logo_transparent').css('marginTop'));
  var menuPaddingTop = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingTop'));
  var menuPaddingBottom = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingBottom'));

  jQuery('#wrapper').css('paddingTop', jQuery('.header_style_wrapper').height()+'px');

  jQuery(window).resize(function() {
    jQuery('#wrapper').css('paddingTop', jQuery('.header_style_wrapper').height()+'px');
  });

  jQuery(window).scroll(function() {
    if(jQuery(this).scrollTop() >= 200){
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
      jQuery('#custom_logo img').removeClass('zoom');
      jQuery('#custom_logo img').css('maxHeight', '');
      jQuery('#custom_logo_transparent img').removeClass('zoom');

      jQuery('#custom_logo').css('marginTop', parseInt(logoMargin)+'px');
      jQuery('#custom_logo_transparent').css('marginTop', parseInt(logoTransMargin)+'px');

      jQuery('#menu_wrapper div .nav > li > a').css('paddingTop', menuPaddingTop+'px');
      jQuery('#menu_wrapper div .nav > li > a').css('paddingBottom', menuPaddingBottom+'px');

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

  var $window = jQuery(window);
  var $portfolioContainer = jQuery('#portfolio_filter_wrapper');

  function rePortfolioLayout() {
    var windowWidth = $portfolioContainer.width();
    var cols = $portfolioContainer.data('columns');
    var columnWidth = windowWidth <= 480 ? 480 : parseInt(windowWidth / cols);

    $portfolioContainer.isotope({
      resizable: false,
      itemSelector: '.element',
      masonry: { columnWidth: columnWidth }
    });
  }

  $portfolioContainer.imagesLoaded(function(){
    rePortfolioLayout();
    $window.smartresize(rePortfolioLayout);

    $portfolioContainer.children('.element').children('.gallery_type, .portfolio_type').addClass('fadeIn');
    jQuery($portfolioContainer).addClass('visible');
  });

  jQuery('.post_img img').each(function() {
    var img = this;
    if (img.complete) {
      jQuery(img).parent('.post_img').addClass('fadeIn');
    } else {
      jQuery(img).on('load', function() {
        jQuery(this).parent('.post_img').addClass('fadeIn');
      });
    }
  });

  jQuery(document).mouseenter(function() {
    jQuery('body').addClass('hover');
  });

  jQuery(document).mouseleave(function() {
    jQuery('body').removeClass('hover');
  });

  jQuery('#mobile_nav_icon').on('click', function() {
    jQuery('body,html').animate({scrollTop:0},100);
    jQuery('body').toggleClass('js_nav');

    if(is_touch_device()) {
      jQuery('body.js_nav').css('overflow', 'auto');
    }
  });

  jQuery('#overlay_background').on('click', function() {
    jQuery('body').removeClass('js_nav');
  });

  if (is_touch_device()) {
    jQuery('.parallax').each(function(){
      var dataImgURL = jQuery(this).data('image');
      if(jQuery.type(dataImgURL) != "undefined") {
        jQuery(this).css('background-image', 'url('+dataImgURL+')');
        jQuery(this).css('background-size', 'cover');
        jQuery(this).css('background-position', 'center center');
      }
    });
  } else {
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

});

jQuery(window).on('resize load', adjustIframes);
