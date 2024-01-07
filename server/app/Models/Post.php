<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;


    protected $with = ['warehouse'];
    
    protected $fillable = [
        'code',
        'user_id',
        'warehouse_id',
        'warehouseChina',
        'sentFrom',
        'issuedClient',
        'description',  // Добавьте 'description' к этому массиву
        'descriptionAdmin',
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
