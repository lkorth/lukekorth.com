<?php

define('THUMB_WIDTH', 300);
define('THUMB_HEIGHT', 300);
define('MAGICK_PATH','../../im/bin/');

function makeThumbnail($in, $out) {
    $width = THUMB_WIDTH;
    $height = THUMB_HEIGHT;
    list($w,$h) = getimagesize($in);

    $thumbRatio = $width/$height;
    $inRatio = $w/$h;
    $isLandscape = $inRatio > $thumbRatio;

    $size = ($isLandscape ? '1000x'.$height : $width.'x1000');
    $xoff = ($isLandscape ? floor((($inRatio*$height)-$width)/2) : 0);
    $command = MAGICK_PATH."convert $in -resize $size -crop {$width}x{$height}+{$xoff}+0 ".
        "-colorspace RGB -strip -quality 90 $out";

    exec($command);
}