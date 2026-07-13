<?php

namespace App\Http\Controllers\Api\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CommentRequest;
use App\Http\Requests\Comment\ReplyRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function index(Post $post): JsonResponse
    {
        if (
            $post->visibility === 'private'
            && $post->user_id !== auth('api')->id()
        ) {
            abort(403, 'Unauthorized.');
        }

        $comments = Comment::query()
            ->where('post_id', $post->id)
            ->whereNull('parent_id')
            ->with([
                'user',
                'replies.user',
            ])
            ->withCount([
                'likes',
                'replies',
            ])
            ->latest()
            ->get();

        return response()->json([
            'data' => CommentResource::collection($comments),
        ]);
    }

    public function store(CommentRequest $request, Post $post): JsonResponse
    {
        if (
            $post->visibility === 'private'
            && $post->user_id !== auth('api')->id()
        ) {
            abort(403, 'Unauthorized.');
        }

        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => auth('api')->id(),
            'parent_id' => null,
            'content' => $request->content,
        ]);

        $comment->load('user')
            ->loadCount(['likes', 'replies']);

        return response()->json([
            'message' => 'Comment added successfully.',
            'data' => new CommentResource($comment),
        ], 201);
    }


    public function reply(ReplyRequest $request, Comment $comment): JsonResponse
    {
        if ($comment->parent_id !== null) {
            return response()->json([
                'message' => 'Replies can only be one level deep.',
            ], 422);
        }

        $post = $comment->post;

        if (
            $post->visibility === 'private'
            && $post->user_id !== auth('api')->id()
        ) {
            abort(403, 'Unauthorized.');
        }

        $reply = Comment::create([
            'post_id' => $comment->post_id,
            'user_id' => auth('api')->id(),
            'parent_id' => $comment->id,
            'content' => $request->content,
        ]);

        $reply->load('user')
            ->loadCount(['likes', 'replies']);

        return response()->json([
            'message' => 'Reply added successfully.',
            'data' => new CommentResource($reply),
        ], 201);
    }
}