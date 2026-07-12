<?php

namespace Database\Seeders;

use App\Models\Puppy;
use Illuminate\Database\Seeder;

class PuppySeeder extends Seeder
{
    public function run(): void
    {
        $breeds = ['Golden Retriever', 'Labrador', 'Beagle', 'Husky', 'German Shepherd', 'Pug', 'Shih Tzu', 'Rottweiler', 'Doberman', 'Pomeranian'];
        $genders = ['Male', 'Female'];
        $colors = ['Golden', 'Black', 'White', 'Brown', 'Mixed'];
        $statuses = ['Available', 'Adopted'];

        for ($i = 1; $i <= 20; $i++) {
            Puppy::create([
                'name' => 'Puppy ' . $i,
                'breed' => $breeds[array_rand($breeds)],
                'age' => rand(1, 12),
                'gender' => $genders[array_rand($genders)],
                'weight' => rand(20, 150) / 10,
                'color' => $colors[array_rand($colors)],
                'vaccinated' => (bool) rand(0, 1),
                'status' => $statuses[array_rand($statuses)],
                'description' => 'A very cute and playful puppy looking for a loving home.',
                // Using a placeholder service since real image uploading isn't happening during seeding
                'image' => null, 
            ]);
        }
    }
}
