<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::query()
            ->with('user')
            ->withCount(['likes', 'comments'])
            ->withExists([
                'likes as is_liked' => function ($query) {
                    $query->where('user_id', auth('api')->id());
                }
            ])
           ->where(function ($query) {
                $query->where('visibility', 'public')
                    ->orWhere('user_id', auth('api')->id());
            })
            ->latest()
            ->paginate(10);

        return PostResource::collection($posts);
    }

    public function store(PostRequest $request): JsonResponse
    {
        $image = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create([
            'user_id'    => auth('api')->id(),
            'content'    => $request->content,
            'image'      => $image,
            'visibility' => $request->visibility,
        ]);

        $post->load('user')->loadCount(['likes', 'comments']);

        $post->is_liked = false;

        return response()->json([
            'message' => 'Post created successfully.',
            'data'    => new PostResource($post),
        ], 201);
    }

    public function show(Post $post): PostResource
    {
        abort_if($post->visibility === 'private' && $post->user_id !== auth('api')->id(), 403);

        $post->load('user')->loadCount(['likes', 'comments']);
        $post->is_liked = $post->likes()->where('user_id', auth('api')->id())->exists();

        return new PostResource($post);
    }
}