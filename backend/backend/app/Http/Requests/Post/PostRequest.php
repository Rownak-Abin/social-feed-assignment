<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => ['nullable','string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'visibility' => ['required', Rule::in(['public', 'private'])],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {

            if (!$this->filled('content') && !$this->hasFile('image')) {
                $validator->errors()->add(
                    'content',
                    'Either content or image is required.'
                );
            }

        });
    }
}