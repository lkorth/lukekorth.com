<?php

require('../config.php');
require('vendor/autoload.php');
require('vendor/php-markdown-extra/markdown.php');

// setup db connection
class R extends RedBean_Facade {}
R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);

// cache dir needs to be writable by server
\Slim\Extras\Views\Twig::$twigTemplateDirs = array('templates');
\Slim\Extras\Views\Twig::$twigOptions = array(
	'charset'           => 'utf-8',
	'cache'             => 'cache'
);

$app = new \Slim\Slim();
$app->view(new \Slim\Extras\Views\Twig());
$twig = $app->view()->getEnvironment();
$twig->addFilter('markdown', new Twig_Filter_Function('Markdown'));

// default route
$app->get('/', function () use ($app) {
});

$app->run();

?>