<?php

$app->get('/blog(/:page)/?', function ($page = 0) use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['number'] = $page;
    $arr['page']['name'] = 'blog';
    $arr['link'] = '';

    $arr['posts'] = R::findAll('post', ' ORDER BY date DESC LIMIT ?,? ', array($page * 3, 3));
    R::preload($arr['posts'], array('author'));
    if (R::count('post') > ($page * 3) + 3)
        $arr['morePosts'] = true;
    else
        $arr['morePosts'] = false;

    foreach($arr['posts'] as $key => $value) {
        $arr['posts'][$key]->ownComment;
        $arr['posts'][$key]['categories'] = R::tag($value);
    }

    $arr['categories'] = getTagCloud();
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));
    $arr['oldest'] = date('Y', strtotime(R::getCell('SELECT date FROM post ORDER BY date ASC LIMIT 1')));

    $app->render('blog.twig', $arr);
})->conditions(array('page' => '\d'));

$app->get('/blog/category/:category(/:page)/?', function($category, $page = 0) use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['number'] = $page;
    $arr['page']['name'] = 'blog';
    $arr['link'] = '/category/' . $category;

    $arr['posts'] = R::tagged('post', array($category));

    usort($arr['posts'], 'orderPosts');

    if (count($arr['posts']) > ($page * 3) + 3)
        $arr['morePosts'] = true;
    else
        $arr['morePosts'] = false;

    $arr['posts'] = array_slice($arr['posts'], ($page * 3), 3);

    R::preload($arr['posts'], array('author'));
    foreach($arr['posts'] as $key => $value) {
        $arr['posts'][$key]->ownComment;
        $arr['posts'][$key]['categories'] = R::tag($value);
    }

    $arr['categories'] = getTagCloud();
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));
    $arr['oldest'] = date('Y', strtotime(R::getCell('SELECT date FROM post ORDER BY date ASC LIMIT 1')));

    $app->render('blog.twig', $arr);
})->conditions(array('page' => '\d'));

$app->get('/blog/archives/:year(/:month(/:page))/?', function($year, $month = 0, $page = 0) use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['number'] = $page;
    $arr['page']['name'] = 'blog';
    $arr['link'] = '/archives/' . $year . '/' . $month;

    if($month == 0) {
        $start = $year . '-01-01';
        $end = $year . '-12-31';
    } else {
        $start = $year . '-' . (($month < 9) ? '0' : '') . $month . '-01';
        $end = $year . '-' . (($month < 9) ? '0' : '') . $month . '-' . cal_days_in_month(CAL_GREGORIAN, $month, $year);
    }

    $arr['posts'] = R::findAll('post', ' WHERE date BETWEEN :start AND :end ORDER BY date DESC ',
        array(':start' => $start, ':end' => $end));

    if (count($arr['posts']) > ($page * 3) + 3)
        $arr['morePosts'] = true;
    else
        $arr['morePosts'] = false;

    $arr['posts'] = array_slice($arr['posts'], ($page * 3), 3);

    R::preload($arr['posts'], array('author'));
    foreach($arr['posts'] as $key => $value) {
        $arr['posts'][$key]->ownComment;
        $arr['posts'][$key]['categories'] = R::tag($value);
    }

    $arr['categories'] = getTagCloud();
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));
    $arr['oldest'] = date('Y', strtotime(R::getCell('SELECT date FROM post ORDER BY date ASC LIMIT 1')));

    $app->render('blog.twig', $arr);
});

$app->get('/blog/:link(/:comments)/?', function($link, $comments = '') use ($app) {
    $arr = array();
    $arr['page']['name'] = 'blog';
    $arr['post'] = R::findOne('post', ' link = ? ', array($link));
    $arr['title'] = $arr['post']->title . ' :: LukeKorth.com';
    $arr['post']->author;
    $arr['post']['categories'] = R::tag($arr['post']);
    $arr['categories'] = getTagCloud();
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));
    $arr['oldest'] = date('Y', strtotime(R::getCell('SELECT date FROM post ORDER BY date ASC LIMIT 1')));

    $arr['comments'] = $arr['post']->ownComment;
    $arr['commentList'] = false;
    if($comments != '')
        $arr['commentList'] = true;

    $form = new PFBC\Form('commentform');

    if(PJAX) {
        $form->configure(array(
            'action' => '/blog/comment',
            'alternateJsInit' => 'jQuery(document).on(\'pjax:complete\', function() {
            checkCaptcha();',
            'ajax' => 1,
            'ajaxCallback' => 'commentForm',
            'view' => new PFBC\View\RightLabel,
            'prevent' => array('bootstrap', 'jQuery', 'focus')
        ));
    } else {
        $form->configure(array(
            'action' => '/blog/comment',
            'ajax' => 1,
            'ajaxCallback' => 'commentForm',
            'view' => new PFBC\View\RightLabel,
            'prevent' => array('bootstrap', 'jQuery', 'focus')
        ));
    }
    $form->addElement(new PFBC\Element\HTML('<h3 class="heading">LEAVE A REPLY</h3>'));
    $form->addElement(new PFBC\Element\Hidden('form', 'commentform'));
    $form->addElement(new PFBC\Element\Hidden('postId', $arr['post']->id));
    $form->addElement(new PFBC\Element\Textbox('Name', 'author', array(
        'required' => 1
    )));
    $form->addElement(new PFBC\Element\Email('Email', 'email', array(
        'required' => 1,
        'shortDesc' => '(not published, used for <a tabindex="500" href="http://gravatar.com">gravatar</a>)',
    )));
    $form->addElement(new PFBC\Element\Textbox('Website', 'website'));
    $form->addElement(new PFBC\Element\Textarea('', 'comment'));
    $form->addElement(new PFBC\Element\Captcha);
    $form->addElement(new PFBC\Element\Button('Post'));

    $arr['form'] = $form;

    $app->render('post.twig', $arr);
});

$app->post('/blog/comment/?', function() use ($app) {
    if($app->request()->post('form') !== null) {
        if(PFBC\Form::isValid($app->request()->post('form'))) {
            $post = R::load('post', $app->request()->post('postId'));

            $comment = R::dispense('comment');
            $comment->author = trim($app->request()->post('author'));
            $comment->email = trim(strtolower($app->request()->post('email')));
            $comment->gravatar = md5($comment->email);
            $comment->website = trim(strtolower($app->request()->post('website')));

            if(!startsWith($comment->website, 'http://') &&
                !startsWith($comment->website, 'https://') &&
                !startsWith($comment->website, 'www.'))
                    $comment->website = 'http://' . $comment->website;

            $comment->comment = $app->request()->post('comment');
            $comment->time = time();

            $post->ownComment[] = $comment;
            R::store($comment);
            R::store($post);

            $arr = array();
            $arr['post'] = $post;
            $arr['comments'] = $arr['post']->ownComment;

            $app->render('comments.twig', $arr);
        } else {
            PFBC\Form::renderAjaxErrorResponse($app->request()->post('form'));
        }
    }
});

$app->post('/blog/kudos/:action/:post/?', function($action, $post) use ($app) {
    $post = R::load('post', $post);

    if($action == 'give')
        $post->kudos = $post->kudos + 1;
    else if($action == 'take')
        $post->kudos = $post->kudos - 1;

    R::store($post);

    echo '200';
});

function orderPosts($a, $b) {
    if (strtotime($a->date) == strtotime($b->date)) {
        return 0;
    }
    return (strtotime($a->date) < strtotime($b->date)) ? 1 : -1;
}

function getTagCloud() {
    return R::getAll('SELECT title, COUNT(tag_id) as count FROM tag JOIN post_tag ON tag.id = post_tag.tag_id GROUP BY title');
}