<?php

require('../config-dev.php');
require('vendor/autoload.php');
require('vendor/php-markdown-extra/markdown.php');
require('helpers/functions.php');

// setup db connection
class R extends RedBean_Facade {}
R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
R::$writer->setUseCache(true);
if(PRODUCTION) {
	R::freeze();

	// cache dir needs to be writable by server
	\Slim\Extras\Views\Twig::$twigTemplateDirs = array('templates');
	\Slim\Extras\Views\Twig::$twigOptions = array(
		'charset'           => 'utf-8',
		'cache'             => 'cache'
	);
} else {
	\Slim\Extras\Views\Twig::$twigTemplateDirs = array('templates');
	\Slim\Extras\Views\Twig::$twigOptions = array(
		'charset'           => 'utf-8'
	);
}

$app = new \Slim\Slim();
$app->view(new \Slim\Extras\Views\Twig());
$twig = $app->view()->getEnvironment();
$twig->addFilter('max_words', new Twig_Filter_Function('max_words'));
$twig->addFilter('time_ago', new Twig_Filter_Function('time_ago'));
$twig->addFilter('markdown', new Twig_Filter_Function('Markdown'));
$twig->addGlobal('pjax', (is_null($app->request()->headers('X-PJAX'))) ? false : true);

// default route
$app->get('/', function () use ($app) {
    $app->redirect('blog');
    $app->stop();
});

require('sections/blog.php');
require('sections/contact.php');
require('sections/about.php');
require('sections/admin.php');
require('sections/faker.php');

$app->run();
