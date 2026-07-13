<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'full_name' => $this->user->first_name . ' ' . $this->user->last_name,
                'avatar' => $this->user->avatar,
            ],
            'likes_count' => $this->likes_count ?? 0,
            'replies_count' => $this->replies_count ?? 0,
            'replies' => CommentResource::collection(
                $this->whenLoaded('replies')
            ),
        ];
    }
}