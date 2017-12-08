<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CommentsController extends Controller
{
    function index(Request $request){
        $comments = Comment::all();
        return response()->json($comments, 200);
        //return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function getComment($id){
        $comment = Comment::findorfail($id)->first();
        return response()->json($comment, 200);
    }

    function createComment(Request $request){
        if($request->isJson()) {
            $data = $request->json()->all();
            $comment = Comment::create([
                'user_img' => $data['user_img'],
                'username' => $data['username'],
                'content' => $data['content'];
            ]);
            return response()->json($comment, 201);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

}