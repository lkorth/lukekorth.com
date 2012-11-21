<?php

$app->get('/contact', function () use ($app) {
    $arr = array();
    $arr['title'] = 'Contact :: LukeKorth.com';
    $arr['page']['name'] = 'contact';

    $app->render('contact.twig', $arr);
});