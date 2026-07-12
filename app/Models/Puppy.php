<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puppy extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'breed',
        'age',
        'gender',
        'weight',
        'color',
        'vaccinated',
        'status',
        'description',
        'image',
    ];

    protected $casts = [
        'vaccinated' => 'boolean',
        'age' => 'integer',
        'weight' => 'decimal:2',
    ];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                      ->orWhere('breed', 'like', '%'.$search.'%');
            });
        })->when($filters['breed'] ?? null, function ($query, $breed) {
            $query->where('breed', $breed);
        })->when($filters['gender'] ?? null, function ($query, $gender) {
            $query->where('gender', $gender);
        })->when(isset($filters['vaccinated']), function ($query) use ($filters) {
            // Check if it's 'yes' or 'no', or boolean
            if ($filters['vaccinated'] !== '') {
                $query->where('vaccinated', $filters['vaccinated'] === '1' || $filters['vaccinated'] === 'yes' || $filters['vaccinated'] === true);
            }
        })->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });
    }
}
