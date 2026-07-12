<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $total = Puppy::count();
        $available = Puppy::where('status', 'Available')->count();
        $adopted = Puppy::where('status', 'Adopted')->count();
        $vaccinated = Puppy::where('vaccinated', true)->count();
        $male = Puppy::where('gender', 'Male')->count();
        $female = Puppy::where('gender', 'Female')->count();
        
        $recent = Puppy::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => compact('total', 'available', 'adopted', 'vaccinated', 'male', 'female'),
            'recent' => $recent
        ]);
    }
}
