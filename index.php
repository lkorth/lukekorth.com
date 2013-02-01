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

$app->hook('slim.after.router', function() use ($app) {
    $file = 'cache/' . str_replace('/', '.', $_SERVER['REQUEST_URI']);
    
    if (!file_exists($file))
        file_put_contents ($file, $app->response()->body());    
}, 10);

// default route
$app->get('/', function () use ($app) {
    $app->redirect('blog');
    $app->stop();
});

$uri = explode("/", $_SERVER['REQUEST_URI']);
if($uri[1] === 'blog')
    require('sections/blog.php');
else if($uri[1] === 'about')
    require('sections/about.php');
else if($uri[1] === 'projects')
    require('sections/projects.php');
else if($uri[1] === 'contact')
    require('sections/contact.php');
else if($uri[1] === 'admin')
    require('sections/admin.php');
//require('sections/faker.php');

$app->run();