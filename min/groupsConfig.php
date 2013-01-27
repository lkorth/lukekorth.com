<?php
/**
 * Groups configuration for default Minify implementation
 * @package Minify
 */

/** 
 * You may wish to use the Minify URI Builder app to suggest
 * changes. http://yourdomain/min/builder/
 *
 * See http://code.google.com/p/minify/wiki/CustomSource for other ideas
 **/

return array(
    'js' => array('//js/jquery-1.8.3.min.js', 
						'//js/jquery.onready.js',
						'//js/css3-mediaqueries.js',
						'//js/custom.js',
						'//js/tabs.js',
						'//js/jquery.pjax.js',
						'//js/superfish-1.4.8/js/hoverIntent.js',
						'//js/superfish-1.4.8/js/superfish.js',
						'//js/superfish-1.4.8/js/supersubs.js',
						'//js/prettyPhoto/js/jquery.prettyPhoto.js',
						'//js/poshytip-1.1/src/jquery.poshytip.min.js',
						'//js/jquery.flexslider-min.js',
						'//js/modernizr.js',
						'//js/jquery.tagcloud.js'),
    'cssAll' => array('//css/reset.css',
                    '//css/comments.css',
                    '//css/widgets.css',
                    '//css/style.css',
                    '//js/poshytip-1.1/src/tip-twitter/tip-twitter.css',
                    '//js/poshytip-1.1/src/tip-yellowsimple/tip-yellowsimple.css',
                    '//css/fonts.css',
                    '//css/flexslider.css',
                    '//css/lessframework.css',
                    '//css/skin.css'),
    'cssScreen' => array('//css/superfish.css',
                        '//js/prettyPhoto/css/prettyPhoto.css')
);