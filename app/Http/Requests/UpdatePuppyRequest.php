<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePuppyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'breed' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer', 'min:0'],
            'gender' => ['required', 'in:Male,Female'],
            'weight' => ['required', 'numeric', 'min:0'],
            'color' => ['nullable', 'string', 'max:255'],
            'vaccinated' => ['boolean'],
            'status' => ['required', 'in:Available,Adopted'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }
}
