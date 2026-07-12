<?php

namespace App\Http\Controllers\Api\Like;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    public function likePost(Post $post): JsonResponse
    {
        if ($post->visibility === 'private' && $post->user_id !== auth('api')->id()) {
            abort(403, 'Unauthorized.');
        }

        $post->likes()->firstOrCreate([
            'user_id' => auth('api')->id(),
        ]);

        return response()->json([
            'message' => 'Post liked successfully.',
        ]);
    }


    public function unlikePost(Post $post): JsonResponse
    {
        $post->likes()->where('user_id', auth('api')->id())->delete();

        return response()->json([
            'message' => 'Post unliked successfully.',
        ]);
    }


    public function postLikes(Post $post): JsonResponse
    {
        if (
            $post->visibility === 'private' &&
            $post->user_id !== auth('api')->id()
        ) {
            abort(403, 'Unauthorized.');
        }

        $users = $post->likes()
            ->with('user')
            ->latest()
            ->get()
            ->pluck('user');

        return response()->json([
            'data' => UserResource::collection($users),
        ]);
    }

    public function likeComment(Comment $comment): JsonResponse
    {
        $post = $comment->post;

        if ($post->visibility === 'private' && $post->user_id !== auth('api')->id()) {
            abort(403, 'Unauthorized.');
        }

        $comment->likes()->firstOrCreate([
            'user_id' => auth('api')->id(),
        ]);

        return response()->json([
            'message' => 'Comment liked successfully.',
        ]);
    }

    public function unlikeComment(Comment $comment): JsonResponse
    {
        $comment->likes()->where('user_id', auth('api')->id())->delete();
        return response()->json([
            'message' => 'Comment unliked successfully.',
        ]);
    }

    public function commentLikes(Comment $comment): JsonResponse
    {
        $post = $comment->post;

        if (
            $post->visibility === 'private' &&
            $post->user_id !== auth('api')->id()
        ) {
            abort(403, 'Unauthorized.');
        }

        $users = $comment->likes()
            ->with('user')
            ->latest()
            ->get()
            ->pluck('user');

        return response()->json([
            'data' => UserResource::collection($users),
        ]);
    }
}