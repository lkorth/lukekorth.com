<?php

$app->get('/about', function (Silex\Application $app) {
    $arr = array();
    $arr['title'] = 'About :: LukeKorth.com';
    $arr['page']['name'] = 'about';

    return $app->render('about.twig', $arr);
});