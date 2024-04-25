<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfirmNews extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'title', 'user_name', 'user_email', 'admin_name', 'admin_email', 'created_at'];
}
