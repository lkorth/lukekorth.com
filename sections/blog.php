<?php

$app->get('/blog', function () use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page'] = 'blog';
    $arr['posts'] = R::findAll('post', ' ORDER BY date DESC LIMIT 3 ');
    R::preload($arr['posts'], array('author'));

    $app->render('blog.twig', $arr);
});
