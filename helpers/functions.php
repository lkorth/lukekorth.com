<?php

function max_words($str, $num, $suffix = '') {
    $words = explode(' ', $str);
    if (count($words) < $num)
        return $str;
    else
        return implode(' ', array_slice($words, 0, $num)) . $suffix;
}

// Returns an English representation of a date
// Graciously stolen from http://ejohn.org/files/pretty.js
function time_ago($time) {
    if (!ctype_digit($time))
        $time = strtotime($time);

    $diff = time() - $time;
    if ($diff == 0)
        return 'now';
    elseif ($diff > 0) {
        $day_diff = floor($diff / 86400);
        if ($day_diff == 0) {
            if ($diff < 60)
                return 'just now';
            if ($diff < 120)
                return '1 minute ago';
            if ($diff < 3600)
                return floor($diff / 60) . ' minutes ago';
            if ($diff < 7200)
                return '1 hour ago';
            if ($diff < 86400)
                return floor($diff / 3600) . ' hours ago';
        }
        if ($day_diff == 1)
            return 'Yesterday';
        if ($day_diff < 7)
            return $day_diff . ' days ago';
        if ($day_diff < 31)
            return ceil($day_diff / 7) . ' weeks ago';
        if ($day_diff < 60)
            return 'last month';
        $ret = date('F Y', $time);
        return ($ret == 'December 1969') ? '' : $ret;
    }
}

function hashed_password($password) {
    return md5($password . SALT);
}

function require_ssl($app) {
    if($app->request()->getScheme() !== 'https') {
        $app->redirect('https://' .$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
        $app->stop();
    }
}