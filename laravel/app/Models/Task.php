<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $guarded = [''];
    protected $fillable = ['title','body','done','photo','category_id'];

    // protected $fillable = ['name'];
   
    public function category(){

        return  $this->belongsTo(Category::class ,'category_id','id');
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
        
    }
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
        
    }
}
