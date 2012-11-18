<?php

$app->get('/blog(/:page)', function ($page = 0) use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['number'] = $page;
    $arr['page']['name'] = 'blog';
    $arr['posts'] = R::findAll('post', ' ORDER BY date DESC LIMIT ?,? ', array($page * 3, 3));
    R::preload($arr['posts'], array('author'));
    if (R::count('post') > ($page * 3) + 3)
        $arr['morePosts'] = true;
    else
        $arr['morePosts'] = false;


    $app->render('blog.twig', $arr);
});