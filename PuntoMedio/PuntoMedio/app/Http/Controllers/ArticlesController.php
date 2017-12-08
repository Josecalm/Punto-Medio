<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ArticlesController extends Controller
{
    function index(Request $request){
        $articles = Article::all();
        return response()->json($articles, 200);
        //return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function getArticle($id){
        $article = Article::findorfail($id)->first();
        return response()->json($article, 200);
    }

    function createArticle(Request $request){
        if($request->isJson()) {
            $data = $request->json()->all();
            $article = Review::create([
                'header_img' => $data['header_img'],
                'name' => $data['name'],
                'author' => $data['author'];
                'year' => $data['year'];
                'category' => $data['category'];
                'description' => $data['description'];
                'rating_admin' => $data['rating_admin'];
                'rating_user' => $data['rating_user'];
            ]);
            return response()->json($article, 201);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

}