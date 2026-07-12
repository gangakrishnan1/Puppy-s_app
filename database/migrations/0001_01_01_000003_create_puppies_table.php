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
        Schema::create('puppies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('breed');
            $table->integer('age'); // in months
            $table->enum('gender', ['Male', 'Female']);
            $table->decimal('weight', 5, 2); // in kg
            $table->string('color')->nullable();
            $table->boolean('vaccinated')->default(false);
            $table->enum('status', ['Available', 'Adopted'])->default('Available');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puppies');
    }
};
