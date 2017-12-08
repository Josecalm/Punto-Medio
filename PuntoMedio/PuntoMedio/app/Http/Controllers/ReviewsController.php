<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ReviewsController extends Controller
{
    function index(Request $request){
        $reviews = Review::all();
        return response()->json($reviews, 200);
        //return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function getReview($id){
        $review = Review::findorfail($id)->first();
        return response()->json($review, 200);
    }

    function createReview(Request $request){
        if($request->isJson()) {
            $data = $request->json()->all();
            $review = Review::create([
                'title' => $data['title'],
                'subtitle' => $data['subtitle'],
                'author' => $data['author'];
                'header_img' => $data['header_img'];
                'content' => $data['content'];
                'rating' => $data['rating'];
            ]);
            return response()->json($review, 201);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

}