<?php

require_once('../config-dev.php');
require_once('vendor/autoload.php');
require_once('helpers/functions.php');

// setup db connection
class R extends RedBean_Facade {}
R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
R::$writer->setUseCache(true);
//R::freeze();

class CustomApplication extends \Silex\Application {
    use Silex\Application\TwigTrait;
}

$app = new CustomApplication();
$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
    'twig.options' => array(
        'charset' => 'utf-8',
        'cache' => __DIR__ . '/cache'
    ),
));
$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addFilter('max_words', new Twig_Filter_Function('max_words'));
    $twig->addFilter('time_ago', new Twig_Filter_Function('time_ago'));
    $twig->addFilter('ceil', new Twig_Filter_Function('ceil'));

    return $twig;
}));
$app->register(new \Nicl\Silex\MarkdownServiceProvider());
$app->register(new \Devture\SilexProvider\PJAX\ServicesProvider());

$app['debug'] = true;
$app['debug'] = true;
$app->register($p = new \Silex\Provider\WebProfilerServiceProvider(), array(
    'profiler.cache_dir' => __DIR__ . '/cache/profiler',
));
$app->mount('/_profiler', $p);

// default route
$app->get('/', function (Silex\Application $app) {
    return $app->redirect('/blog');
});

$uri = explode("/", $_SERVER['REQUEST_URI']);
if($uri[1] === 'blog')
    require('sections/blog.php');
else if($uri[1] === 'about')
    require('sections/about.php');
else if($uri[1] === 'projects')
    require('sections/projects.php');
else if($uri[1] === 'photos')
    require('sections/photos.php');
else if($uri[1] === 'contact')
    require('sections/contact.php');
else if($uri[1] === 'admin')
    require('sections/admin.php');
else if($uri[1] === 'atom' || $uri[1] === 'rss')
    require('sections/services.php');
//require('sections/faker.php');

$app->run();