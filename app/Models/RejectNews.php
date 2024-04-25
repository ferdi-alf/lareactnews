<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RejectNews extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'title', 'message', 'user_name', 'user_email', 'admin_name', 'admin_email', 'created_at'];
}
