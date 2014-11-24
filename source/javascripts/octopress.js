function getNav() {
  var mainNav = $('ul.main-navigation, ul[role=main-navigation]').before('<fieldset class="mobile-nav">')
  var mobileNav = $('fieldset.mobile-nav').append('<select>');
  mobileNav.find('select').append('<option value="">Navigate&hellip;</option>');
  var addOption = function(i, option) {
    mobileNav.find('select').append('<option value="' + this.href + '">&raquo; ' + $(this).text() + '</option>');
  }
  mainNav.find('a').each(addOption);
  $('ul.subscription a').each(addOption);
  mobileNav.find('select').bind('change', function(event) {
    if (event.target.value) { window.location.href = event.target.value; }
  });
}

function addCodeLineNumbers() {
  if (navigator.appName === 'Microsoft Internet Explorer') { return; }
  $('div.gist-highlight').each(function(code) {
    var tableStart = '<table><tbody><tr><td class="gutter">',
        lineNumbers = '<pre class="line-numbers">',
        tableMiddle = '</pre></td><td class="code">',
        tableEnd = '</td></tr></tbody></table>',
        count = $('.line', code).length;
    for (var i=1;i<=count; i++) {
      lineNumbers += '<span class="line-number">'+i+'</span>\n';
    }
    var table = tableStart + lineNumbers + tableMiddle + '<pre>'+$('pre', code).html()+'</pre>' + tableEnd;
    $(code).html(table);
  });
}

$('document').ready(function() {
  addCodeLineNumbers();
  getNav();

  var stickyNavTop = $('#nav').offset().top;
  var nonFixedPadding = parseInt($('nav').css('paddingLeft'));
  var bodyMargin = parseInt($('body').css('marginLeft'));

  var stickyNav = function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > stickyNavTop) {
      $('#nav-placeholder').css({display: 'block'});
      $('#nav').addClass('sticky');
      $('#nav').css({paddingLeft: nonFixedPadding + bodyMargin + 'px'});
    } else {
      $('#nav-placeholder').css({display: 'none'});
      $('#nav').removeClass('sticky');
      $('#nav').css({paddingLeft: nonFixedPadding + 'px'});
    }
  };

  stickyNav();
  $(window).scroll(stickyNav);
});

// iOS scaling bug fix
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }
  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [0.25, 1.6];
    doc[addEvent](type, fix, true);
  }
}(document));

