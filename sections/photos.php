<?php

$app->get('/photos/?', function () use ($app) {
    $arr = array();
    $arr['title'] = 'Photos :: LukeKorth.com';
    $arr['page']['name'] = 'photos';

    $app->render('photos.twig', $arr);
});