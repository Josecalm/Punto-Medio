<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;

class Article extends Model implements 
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'header_img', 'name', 'author', 'year', 'category', 'description', 'rating_admin', 'rating_user'
    ];

}