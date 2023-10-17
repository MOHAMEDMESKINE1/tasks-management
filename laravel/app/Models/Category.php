<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    // protected $fillable = ['name'];
    // protected $guarded = [''];

    public function tasks(){

        return  $this->hasMany(Task::class);
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
