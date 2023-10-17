<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
     public function index(){
        
        return  Category::has('tasks')->get();
     }
     public function all(){
        
        return  Category::all();
     }
}
