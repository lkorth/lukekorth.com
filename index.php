<?php

require('../config.php');
require('vendor/autoload.php');
require('vendor/php-markdown-extra/markdown.php');
require('helpers/functions.php');

// setup db connection
class R extends RedBean_Facade {}
R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);

// cache dir needs to be writable by server
\Slim\Extras\Views\Twig::$twigTemplateDirs = array('templates');
\Slim\Extras\Views\Twig::$twigOptions = array(
	'charset'           => 'utf-8',
	'cache'             => 'cache'
);

$pjax = false;
$headers = getallheaders();
if(isset($headers['X-PJAX']))
    $pjax = true;

$app = new \Slim\Slim();
$app->view(new \Slim\Extras\Views\Twig());
$twig = $app->view()->getEnvironment();
$twig->addFilter('max_words', new Twig_Filter_Function('max_words'));
$twig->addFilter('time_ago', new Twig_Filter_Function('time_ago'));
$twig->addFilter('markdown', new Twig_Filter_Function('Markdown'));
$twig->addGlobal('pjax', $pjax);

// default route
$app->get('/', function () use ($app) {
    $app->redirect('blog');
    $app->stop();
});

require('sections/blog.php');
require('sections/contact.php');
require('sections/about.php');

$app->run();