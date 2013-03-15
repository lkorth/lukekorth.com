<?php

$app->get('/contact', function (Silex\Application $app) {
    $arr = array();
    $arr['title'] = 'Contact :: LukeKorth.com';
    $arr['page']['name'] = 'contact';

    return $app->render('contact.twig', $arr);
});