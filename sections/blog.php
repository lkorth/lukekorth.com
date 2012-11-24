<?php

//paged blog view
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

    //ugly hack to force preloading of categories
    foreach($arr['posts'] as $post)
       $post->sharedCategory;

    $arr['categories'] = R::findAll('category', ' ORDER BY name ASC LIMIT 8 ');
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array(date('Y') . '-01-01 00:00:00'));

    $app->render('blog.twig', $arr);
})->conditions(array('page' => '\d'));