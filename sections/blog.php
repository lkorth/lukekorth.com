<?php

$app->get('/blog(/:page)', function ($page = 0) use ($app) {
    $first = $page * 3;
    $count = 3;

    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['posts'] = R::findAll('post', ' ORDER BY date DESC LIMIT ?,? ', array($first, $count));
    $arr['page']['name'] = 'blog';
    R::preload($arr['posts'], array('author'));

    $app->render('blog.twig', $arr);
});