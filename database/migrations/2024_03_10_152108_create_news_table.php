<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('foto')->nullable();
            $table->string('title');
            $table->string('description');
            $table->unsignedInteger('views')->default(0); // Jumlah views
            $table->string('last_viewed_ip')->nullable(); // IP terakhir yang mengakses berita
            $table->string('category');
            $table->string('author');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};