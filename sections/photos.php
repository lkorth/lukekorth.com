<?php

$app->get('/photos', function (Silex\Application $app) {
    $arr = array();
    $arr['title'] = 'Photos :: LukeKorth.com';
    $arr['page']['name'] = 'photos';

    return $app->render('photos.twig', $arr);
});