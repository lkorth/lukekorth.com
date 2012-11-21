<?php

$app->get('/about', function () use ($app) {
    $arr = array();
    $arr['title'] = 'About :: LukeKorth.com';
    $arr['page']['name'] = 'about';

    $app->render('about.twig', $arr);
});