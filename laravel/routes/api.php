<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function(){
    Route::post('login','login');
    Route::post('register','register');
});

Route::group(['middleware' =>'api'],function(){

    Route::controller(AuthController::class)
    ->group(function(){
        Route::post('logout','logout');
        Route::post('refresh','refresh');
        Route::post('authenticated','authenticated');
    });

    Route::controller(TaskController::class)
    ->prefix('tasks')
    ->group(function(){

        Route::get('/charts', 'tasksChart');
        Route::get('/charts/tasks/done', 'CompletedTasksByDate');
        Route::get('', 'index');
        Route::get('/all', 'all');
        Route::get('/export', 'exportTasksToExcel');
        Route::get('/show/{task}', 'show');
        Route::get('/category/{task}', 'getTaskByCatgeory');
        Route::get('/search/{task}', 'getTaskByTerm');
        Route::get('/order/{column}/{direction}/tasks', 'getTaskOrderBy');
       
        Route::post('/create', 'store');
        Route::put('/update/{task}', 'update');
        Route::delete('/{task}', 'destroy');

    });

    Route::controller(CategoryController::class)
    ->prefix('categories')
    ->group(function(){
        Route::get('', 'index');
        Route::get('/all','all');
    });
});
