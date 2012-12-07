<?php

$app->get('/admin', function () use ($app) {
    require_ssl($app);

    session_name('lukekorth');
    session_start();

    $author = null;
    if(!empty($_SESSION['author.id']))
        $author = R::load ('author', $_SESSION['author.id']);

    $arr = array();
    if($author !== null) {
        //render dashboard

        $app->render('admin.twig', $arr);
    } else {
        $form = new PFBC\Form('loginForm');
        $form->configure(array(
            'action' => '/admin',
            "labelToPlaceholder" => 1,
            'prevent' => array('bootstrap', 'jQuery')
        ));
        $form->addElement(new PFBC\Element\HTML('<h3 class="heading">LOGIN</h3>'));
        $form->addElement(new PFBC\Element\Textbox('Username', 'username', array(
            'required' => 1
        )));
        $form->addElement(new PFBC\Element\Password('Password', 'password', array(
            'required' => 1
        )));
        $form->addElement(new PFBC\Element\Button('Login'));

        $arr['form'] = $form;

        $app->render('login.twig', $arr);
    }
});

$app->post('/admin', function () use ($app) {
    require_ssl($app);

    session_name('lukekorth');
    session_start();

    $username = $app->request()->post('username');
    $password = $app->request()->post('password');

    if(!empty($username) && !empty($password)) {

        $author = R::findOne('author', ' username = :username AND password = :password ', array(
                ':username' => $username,
                ':password' => hashed_password($password)
            ));

        if($author !== null && $author->username == $username) {
            $_SESSION['author.id'] = $author->id;
        } else {
            $error = R::dispense('error');
            $error->type = 'failed-login';
            $error->time = time();
            $error->ip = getIP();
            $error->referrer = $app->request()->getReferrer();
            $error->uas = $app->request()->getUserAgent();
            R::store($error);
        }
    }

    $app->redirect('/admin');
});

?>
