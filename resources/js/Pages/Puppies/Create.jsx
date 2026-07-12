import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Camera, ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        breed: '',
        age: '',
        gender: 'Male',
        weight: '',
        color: '',
        vaccinated: false,
        status: 'Available',
        description: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('puppies.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('puppies.index')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h2 className="font-bold text-2xl text-gray-800 leading-tight">Add New Puppy</h2>
                </div>
            }
        >
            <Head title="Add Puppy" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">
                            
                            {/* Image Upload */}
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="relative group">
                                    <div className="w-40 h-40 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 transition-all group-hover:border-indigo-300">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Camera className="w-12 h-12 text-gray-300 group-hover:text-indigo-300 transition-colors" />
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/png,image/jpg,image/webp" 
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-lg text-white pointer-events-none">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 text-center">Click to upload a profile picture<br/>(JPG, PNG, max 2MB)</p>
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                        placeholder="e.g. Max"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Breed */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                                    <input
                                        type="text"
                                        value={data.breed}
                                        onChange={e => setData('breed', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.breed ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                        placeholder="e.g. Golden Retriever"
                                    />
                                    {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (Months)</label>
                                    <input
                                        type="number"
                                        value={data.age}
                                        onChange={e => setData('age', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.age ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                        placeholder="e.g. 3"
                                    />
                                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.gender ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                </div>

                                {/* Weight */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.weight}
                                        onChange={e => setData('weight', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.weight ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                        placeholder="e.g. 5.5"
                                    />
                                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                                </div>

                                {/* Color */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                    <input
                                        type="text"
                                        value={data.color}
                                        onChange={e => setData('color', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.color ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                        placeholder="e.g. Brown & White"
                                    />
                                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className={`w-full rounded-xl border ${errors.status ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Adopted">Adopted</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>

                                {/* Vaccinated Toggle */}
                                <div className="flex flex-col justify-center">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vaccinated</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={data.vaccinated}
                                            onChange={e => setData('vaccinated', e.target.checked)}
                                        />
                                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-700">{data.vaccinated ? 'Yes' : 'No'}</span>
                                    </label>
                                    {errors.vaccinated && <p className="text-red-500 text-sm mt-1">{errors.vaccinated}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="4"
                                    className={`w-full rounded-xl border ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                                    placeholder="Tell us about the puppy..."
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="flex items-center justify-end pt-6 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {processing ? 'Saving...' : 'Save Puppy'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
