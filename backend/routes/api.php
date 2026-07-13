<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Comment\CommentController;
use App\Http\Controllers\Api\Like\LikeController;
use App\Http\Controllers\Api\Post\PostController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me'])->name('me');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    });
});

Route::middleware('auth:api')->group(function () {

    Route::prefix('post')->name('posts.')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/{post}', [PostController::class, 'show'])->name('show');

        Route::get('/{post}/comments', [CommentController::class, 'index'])->name('comments.index');
        Route::post('/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

        Route::post('/{post}/like', [LikeController::class, 'likePost'])->name('like');
        Route::delete('/{post}/like', [LikeController::class, 'unlikePost'])->name('unlike');
        Route::get('/{post}/likes', [LikeController::class, 'postLikes'])->name('likes');
    });

    Route::prefix('comments')->name('comments.')->group(function () {
        Route::post('/{comment}/reply', [CommentController::class, 'reply'])->name('reply');

        Route::post('/{comment}/like', [LikeController::class, 'likeComment'])->name('like');
        Route::delete('/{comment}/like', [LikeController::class, 'unlikeComment'])->name('unlike');
        Route::get('/{comment}/likes', [LikeController::class, 'commentLikes'])->name('likes');
    });

});