<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class PendingNews extends Model
{
    protected $fillable = ['id_user', 'user_name', 'user_email', 'title_news', 'description_news', 'category'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}