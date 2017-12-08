<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/users', ['uses' => 'UsersController@index']);
$router->post('/users', ['uses' => 'UsersController@createUser']);

$router->get('/reviews', ['uses' => 'ReviewsController@index']);
$router->get('/reviews/{id}', ['uses' => 'ReviewsController@getReview']);
$router->post('/reviews', ['uses' => 'ReviewsController@createReview']);

$router->get('/comments', ['uses' => 'CommentsController@index']);
$router->get('/comments/{id}', ['uses' => 'CommentsController@getComment']);
$router->post('/comments', ['uses' => 'CommentsController@createComment']);

$router->get('/articles', ['uses' => 'ArticlesController@index']);
$router->get('/articles/{id}', ['uses' => 'ArticlesController@getArticle']);
$router->post('/articles', ['uses' => 'ArticlesController@createArticles']);



$router->post('/users/login', ['uses' => 'UsersController@getToken']);

$router->group(['middleware' => ['auth']], function () use ($router){
	
});
