<?php

$app->get('/projects', function (Silex\Application $app) {
    $arr = array();
    $arr['title'] = 'Work :: LukeKorth.com';
    $arr['page']['name'] = 'projects';

    return $app->render('projects.twig', $arr);
});