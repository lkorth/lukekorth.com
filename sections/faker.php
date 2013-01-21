<?php

$app->get('/fake', function () use ($app) {
    // use the factory to create a Faker\Generator instance
    $faker = Faker\Factory::create();

    $author = R::dispense('author');
    $author->name = 'Luke';
    $author->username = strtolower($author->name);
    $author->password = $faker->md5;

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
        $post->text = $faker->text;
        $author->ownPost[] = $post;

        R::tag($post, array($cats[$first], $cats[$second]));

        R::store($post);
    }

    //for($k = 0; $k < 1800; $k++) {
    //}
});