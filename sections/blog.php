<?php

$app->get('/blog(/:page)', function ($page = 0) use ($app) {
    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['number'] = $page;
    $arr['page']['name'] = 'blog';
    $arr['posts'] = R::findAll('post', ' ORDER BY date DESC LIMIT ?,? ', array($page * 3, 3));
    R::preload($arr['posts'], array('author'));
    if (R::count('post') > ($page * 3) + 3)
        $arr['morePosts'] = true;
    else
        $arr['morePosts'] = false;

    foreach($arr['posts'] as $key => $value) {
        $arr['posts'][$key]['categories'] = R::tag($value);
    }

    $arr['categories'] = getTagCloud();
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));

    $app->render('blog.twig', $arr);
})->conditions(array('page' => '\d'));

$app->get('/blog/:link(/:comments)', function($link, $comments = '') use ($app) {
    session_name('lukekorth');
    session_start();

    $arr = array();
    $arr['title'] = 'Blog :: LukeKorth.com';
    $arr['page']['name'] = 'blog';
    $arr['post'] = R::findOne('post', ' link = ? ', array($link));
    $arr['post']->author;
    $arr['post']->sharedCategory;

    $arr['categories'] = R::findAll('category', ' ORDER BY name ASC LIMIT 8 ');
    $arr['archives'] = R::findAll('post', ' WHERE date > ? ORDER BY date DESC ', array((date('Y') - 1) . '-01-01 00:00:00'));

    $arr['comments'] = $arr['post']->ownComment;

    $arr['commentList'] = false;
    if($comments != '')
        $arr['commentList'] = true;

    $form = new PFBC\Form('commentform');
    $form->configure(array(
        'action' => '/comment',
        'ajax' => 1,
        'ajaxCallback' => 'commentForm',
        'view' => new PFBC\View\RightLabel,
        'prevent' => array('bootstrap', 'jQuery')
    ));
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

function getTagCloud() {
    return R::getAll('SELECT title, COUNT(tag_id) as count FROM tag JOIN post_tag ON tag.id = post_tag.tag_id GROUP BY title');
}