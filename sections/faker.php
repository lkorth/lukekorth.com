<?php

$app->get('/fake', function () use ($app) {
    /*
    $faker = Faker\Factory::create();

    $author = R::dispense('author');
    $author->name = 'Luke';
    $author->username = strtolower($author->name);
    $author->password = $faker->md5;
    $author->id = R::store($author);

    $cats = array();
    for($j = 0; $j < 35; $j++) {
        $cats[] = $faker->word;
    }

    for($i = 0; $i < 200; $i++) {
        $first = rand(0, 34);
        $second = rand(0, 34);
        if($second == $first)
            $second++;
        if($second > 34)
            $second = 0;

        $post = R::dispense('post');
        $post->title = $faker->catchPhrase;
        $post->link = str_replace(' ', '-', strtolower($post->title));
        $post->date = $faker->dateTime;
        $post->kudos = rand(0, 100);
        $post->text = $faker->text;
        $author->ownPost[] = $post;

        R::tag($post, array($cats[$first], $cats[$second]));

        $comments = rand(0, 35);
        for($j = 0; $j < $comments; $j++) {
            $comment = R::dispense('comment');
            $comment->author = $faker->name;
            $comment->email = $faker->email;
            $comment->gravatar = md5($comment->email);
            $comment->website = (rand(0, 1) == 0) ? $faker->url : '';
            $comment->comment = $faker->text(rand(5, 800));
            $comment->time = $faker->unixTime;

            $post->ownComment[] = $comment;
        }
    }

    R::store($author);
    */
});