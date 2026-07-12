import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, Dog, Activity, CheckCircle, Bone, Heart } from 'lucide-react';

export default function Dashboard({ auth, stats, recent }) {
    const statCards = [
        { label: 'Total Puppies', value: stats.total, icon: Users, color: 'from-blue-500 to-cyan-400' },
        { label: 'Available', value: stats.available, icon: Dog, color: 'from-emerald-500 to-teal-400' },
        { label: 'Adopted', value: stats.adopted, icon: Heart, color: 'from-rose-500 to-pink-400' },
        { label: 'Vaccinated', value: stats.vaccinated, icon: CheckCircle, color: 'from-violet-500 to-purple-400' },
        { label: 'Male', value: stats.male, icon: Activity, color: 'from-indigo-500 to-blue-400' },
        { label: 'Female', value: stats.female, icon: Bone, color: 'from-amber-500 to-orange-400' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden relative isolate">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 z-0"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                Welcome back, {auth.user.name}! 🐾
                            </h3>
                            <p className="text-gray-500 text-lg">Here's what's happening in your puppy management center today.</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {statCards.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                        <h4 className="text-4xl font-bold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                            {stat.value}
                                        </h4>
                                    </div>
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Puppies */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Recently Added</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recent.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No puppies added yet.</p>
                            ) : (
                                recent.map(puppy => (
                                    <div key={puppy.id} className="py-4 flex items-center justify-between group hover:bg-gray-50/50 rounded-xl px-4 transition-colors -mx-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                                {puppy.image ? (
                                                    <img src={`/storage/${puppy.image}`} alt={puppy.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Dog className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{puppy.name}</h4>
                                                <p className="text-sm text-gray-500">{puppy.breed} • {puppy.age} months</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                puppy.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {puppy.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
