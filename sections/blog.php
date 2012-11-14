<?php

$app->get('/blog', function () use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page'] = 'blog';

    $app->render('blog.twig', $arr);
});
