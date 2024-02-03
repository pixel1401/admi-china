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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('user_id')->constrained()->onDelete("cascade");
            $table->foreignId('warehouse_id')->nullable()->constrained('warehouses');
            $table->boolean('warehouseChina')->default(false); // есть ли в склад в китае
            $table->boolean('sentFrom')->default(false); // sentForm Almaty
            $table->boolean('issuedClient')->default(false);
            $table->string('description')->nullable();
            $table->string('descriptionAdmin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
