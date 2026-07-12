import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Calendar, Activity, Info, Droplet, Dog, CheckCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';

export default function Show({ auth, puppy }) {
    
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this puppy?')) {
            router.delete(route('puppies.destroy', puppy.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('puppies.index')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <h2 className="font-bold text-2xl text-gray-800 leading-tight">Puppy Profile</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('puppies.edit', puppy.id)}
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        <button 
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={puppy.name} />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            
                            {/* Image Section */}
                            <div className="w-full md:w-2/5 h-80 md:h-auto bg-gray-100 relative">
                                {puppy.image ? (
                                    <img src={`/storage/${puppy.image}`} alt={puppy.name} className="w-full h-full object-cover absolute inset-0" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center absolute inset-0">
                                        <Dog className="w-24 h-24 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-1.5 text-sm font-bold rounded-full shadow-lg ${
                                        puppy.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                                    }`}>
                                        {puppy.status}
                                    </span>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-3/5 p-8 md:p-10">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{puppy.name}</h1>
                                    <p className="text-xl text-gray-500 font-medium">{puppy.breed}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm"><Calendar className="w-6 h-6 text-indigo-500" /></div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Age</p>
                                            <p className="text-lg font-bold text-gray-900">{puppy.age} Months</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm"><Activity className="w-6 h-6 text-blue-500" /></div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Weight</p>
                                            <p className="text-lg font-bold text-gray-900">{puppy.weight} kg</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm"><Info className="w-6 h-6 text-pink-500" /></div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Gender</p>
                                            <p className="text-lg font-bold text-gray-900">{puppy.gender}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm"><Droplet className="w-6 h-6 text-amber-500" /></div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Color</p>
                                            <p className="text-lg font-bold text-gray-900">{puppy.color || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        About {puppy.name}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl">
                                        {puppy.description || 'No description provided for this puppy yet.'}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        {puppy.vaccinated ? (
                                            <><CheckCircle className="w-5 h-5 text-emerald-500" /><span className="text-emerald-700 font-medium">Vaccinated</span></>
                                        ) : (
                                            <><XCircle className="w-5 h-5 text-gray-400" /><span className="text-gray-500 font-medium">Not Vaccinated</span></>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Added on {dayjs(puppy.created_at).format('MMM D, YYYY')}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
