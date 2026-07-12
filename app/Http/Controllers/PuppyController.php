<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePuppyRequest;
use App\Http\Requests\UpdatePuppyRequest;
use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PuppyController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'breed', 'gender', 'vaccinated', 'status']);
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');

        $allowedSorts = ['name', 'age', 'created_at'];
        if (!in_array($sortField, $allowedSorts)) {
            $sortField = 'created_at';
        }

        $puppies = Puppy::query()
            ->filter($filters)
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Puppies/Index', [
            'puppies' => $puppies,
            'filters' => $filters,
            'sort' => [
                'field' => $sortField,
                'direction' => $sortDirection,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Puppies/Create');
    }

    public function store(StorePuppyRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('puppies', 'public');
        }

        Puppy::create($data);

        return redirect()->route('puppies.index')->with('success', 'Puppy added successfully.');
    }

    public function show(Puppy $puppy)
    {
        return Inertia::render('Puppies/Show', [
            'puppy' => $puppy
        ]);
    }

    public function edit(Puppy $puppy)
    {
        return Inertia::render('Puppies/Edit', [
            'puppy' => $puppy
        ]);
    }

    public function update(UpdatePuppyRequest $request, Puppy $puppy)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($puppy->image) {
                Storage::disk('public')->delete($puppy->image);
            }
            $data['image'] = $request->file('image')->store('puppies', 'public');
        }

        $puppy->update($data);

        return redirect()->route('puppies.index')->with('success', 'Puppy updated successfully.');
    }

    public function destroy(Puppy $puppy)
    {
        if ($puppy->image) {
            Storage::disk('public')->delete($puppy->image);
        }
        
        $puppy->delete();

        return redirect()->route('puppies.index')->with('success', 'Puppy deleted successfully.');
    }
}
