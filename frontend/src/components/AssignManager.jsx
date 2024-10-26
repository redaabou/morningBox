import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCafeterias, assignManager } from '../redux/actions/cafeteriaActions';
import { fetchUsers } from '../redux/actions/authActions';

function AssignManager() {
    const [selectedCafeteria, setSelectedCafeteria] = useState('');
    const [selectedManager, setSelectedManager] = useState('');
    const dispatch = useDispatch();
    
    const { cafeterias, loading: cafeteriasLoading, error: cafeteriasError } = useSelector(state => state.cafeteria);
    const { users, loading: usersLoading, error: usersError } = useSelector(state => state.auth);
    const { success, error: assignError } = useSelector(state => state.assignManager || {});

    useEffect(() => {
        dispatch(fetchCafeterias());
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCafeteria && selectedManager) {
            dispatch(assignManager(selectedCafeteria, selectedManager));
        }
    };

    if (cafeteriasLoading || usersLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );
    
    if (cafeteriasError || usersError) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {cafeteriasError || usersError}</span>
        </div>
    );

    const gerantUsers = users.filter(user => user.role === 'gerant');

    return (
        <div className="min-h-screen py-6 flex flex-col mr:base lg:mr-64 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-rose-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-center mb-6">Assign Manager to Cafeteria</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <select
                                    id="cafeteria"
                                    value={selectedCafeteria}
                                    onChange={(e) => setSelectedCafeteria(e.target.value)}
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                    required
                                >
                                    <option value="">Select a cafeteria</option>
                                    {cafeterias.map((cafeteria) => (
                                        <option key={cafeteria._id} value={cafeteria._id}>
                                            {cafeteria.nom}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="cafeteria" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Select Cafeteria
                                </label>
                            </div>
                            <div className="relative">
                                <select
                                    id="manager"
                                    value={selectedManager}
                                    onChange={(e) => setSelectedManager(e.target.value)}
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                    required
                                >
                                    <option value="">Select a manager</option>
                                    {gerantUsers.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.nom}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="manager" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Select Manager
                                </label>
                            </div>
                            <div className="relative">
                                <button type="submit" className="w-full bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50 transition-colors">
                                    Assign Manager
                                </button>
                            </div>
                        </form>
                        {assignError && (
                            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error:</strong>
                                <span className="block sm:inline"> {assignError}</span>
                            </div>
                        )}
                        {success && (
                            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Success:</strong>
                                <span className="block sm:inline"> Manager assigned successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignManager;