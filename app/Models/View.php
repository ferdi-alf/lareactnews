<?php

namespace App\Models;

use App\Models\News;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class View extends Model
{
    use HasFactory;

    protected $fillable = ['id_berita', 'ip_address'];

    public function news()
    {
        return $this->belongsTo(News::class, 'id_berita', 'id');
    }
}