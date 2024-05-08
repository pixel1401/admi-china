<?php

use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WarehouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::middleware(['auth:sanctum'])->group( function () {

    // USER
    Route::get('/logged-in-user', [UserController::class, 'loggedInUser']);
    Route::get('/user/${id}', [UserController::class, 'show']);

    Route::patch('/user/change-password', [UserController::class, 'changePassword']);

    Route::put('/user/update' , [UserController::class , 'update']);

    Route::get('/user-have-post', [UserController::class, 'getUsersPost']);


    // POST
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/post', [PostController::class, 'store']);
    Route::delete('/post/{id}', [PostController::class, 'destroy']);
    Route::put('/post/{id}', [PostController::class, 'update']);

    Route::get('/archive', [PostController::class, 'indexArchive']);
    



    // Warehouse
    Route::get('/warehouse', [WarehouseController::class, 'index']);


    // return $request->user();
});
