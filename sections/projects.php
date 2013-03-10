<?php

$app->get('/projects/?', function () use ($app) {
    $arr = array();
    $arr['title'] = 'Work :: LukeKorth.com';
    $arr['page']['name'] = 'projects';

    $app->render('projects.twig', $arr);
});