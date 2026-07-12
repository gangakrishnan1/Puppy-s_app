import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Dog } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Index({ auth, puppies, filters, sort, flash }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [genderFilter, setGenderFilter] = useState(filters.gender || '');

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        router.get(route('puppies.index'), {
            search,
            status: statusFilter,
            gender: genderFilter,
            sort: sort.field,
            direction: sort.direction
        }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this puppy?')) {
            router.delete(route('puppies.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleSort = (field) => {
        const direction = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
        router.get(route('puppies.index'), {
            ...filters,
            sort: field,
            direction: direction
        }, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Puppies Directory</h2>}
        >
            <Head title="Puppies" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Toolbar */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <form onSubmit={handleSearch} className="flex-1 w-full flex items-center gap-2">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search by name or breed..." 
                                    className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            
                            <select 
                                value={statusFilter} 
                                onChange={e => { setStatusFilter(e.target.value); setTimeout(applyFilters, 0); }}
                                className="border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="Available">Available</option>
                                <option value="Adopted">Adopted</option>
                            </select>

                            <select 
                                value={genderFilter} 
                                onChange={e => { setGenderFilter(e.target.value); setTimeout(applyFilters, 0); }}
                                className="border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 hidden md:block"
                            >
                                <option value="">All Genders</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <button type="submit" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                <Filter className="w-5 h-5" />
                            </button>
                        </form>

                        <Link 
                            href={route('puppies.create')} 
                            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Puppy
                        </Link>
                    </div>

                    {/* Desktop Table View */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hidden md:block">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Puppy</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('age')}>Age & Gender</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {puppies.data.map(puppy => (
                                    <tr key={puppy.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
                                                    {puppy.image ? (
                                                        <img src={`/storage/${puppy.image}`} alt={puppy.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Dog className="w-6 h-6 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-lg">{puppy.name}</div>
                                                    <div className="text-sm text-gray-500">{puppy.breed}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{puppy.age} months</div>
                                            <div className="text-sm text-gray-500">{puppy.gender}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    puppy.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                }`}>
                                                    {puppy.status}
                                                </span>
                                                {puppy.vaccinated ? (
                                                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md">Vaccinated</span>
                                                ) : (
                                                    <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-md">Not Vaccinated</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('puppies.show', puppy.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <Link href={route('puppies.edit', puppy.id)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors">
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button onClick={() => handleDelete(puppy.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {puppies.data.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <Dog className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">No puppies found.</p>
                                <p className="text-sm">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {puppies.data.map(puppy => (
                            <div key={puppy.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
                                        {puppy.image ? (
                                            <img src={`/storage/${puppy.image}`} alt={puppy.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Dog className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900 text-lg">{puppy.name}</h3>
                                            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                                puppy.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                                {puppy.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1">{puppy.breed}</p>
                                        <p className="text-sm text-gray-700">{puppy.age} mos • {puppy.gender}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                                    <div className="text-xs font-medium px-2 py-1 bg-gray-50 rounded-md text-gray-600">
                                        {puppy.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={route('puppies.show', puppy.id)} className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Eye className="w-4 h-4" /></Link>
                                        <Link href={route('puppies.edit', puppy.id)} className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Edit className="w-4 h-4" /></Link>
                                        <button onClick={() => handleDelete(puppy.id)} className="p-2 bg-red-50 text-red-600 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {puppies.links.length > 3 && (
                        <div className="flex justify-center mt-8 pb-8">
                            <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 border border-gray-100">
                                {puppies.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active 
                                                ? 'bg-indigo-600 text-white shadow-md' 
                                                : link.url 
                                                    ? 'text-gray-600 hover:bg-gray-100' 
                                                    : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
