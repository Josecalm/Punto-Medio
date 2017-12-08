<?php

use GuzzleHttp\Client;

Route::get('/', function () {
	$client = new Client([
		'base_uri' => 'localhost:8088',
		'timeout' => 3.0,
	]);
	$response = $client->request('GET', 'users');
	dd($response);
    return view('index');
});

Route::get('/users/login', function () {
	return view('login');
});
