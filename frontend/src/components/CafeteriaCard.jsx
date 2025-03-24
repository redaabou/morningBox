import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCafeterias, fetchGerantCafeteria, deleteCafeteria, updateCafeteria } from '../redux/actions/cafeteriaActions';
import { useNavigate } from 'react-router-dom';
import Toastify from '../utils/Toastify';

function CafeteriaCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cafeterias, loading, error } = useSelector((state) => state.cafeteria);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCafeteria, setSelectedCafeteria] = useState(null);
  const [updatedCafeteriaData, setUpdatedCafeteriaData] = useState({
    nom: '',
    adresse: '',
    telephone: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchCafeterias());
    if (user && user.role === 'gerant') {
      dispatch(fetchGerantCafeteria(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cafeteria?')) {
      await dispatch(deleteCafeteria(id)).then(() => {
        Toastify('Cafeteria deleted successfully', 'success');
        dispatch(fetchCafeterias());
      }).catch(() => {
        Toastify('Failed to delete cafeteria', 'error');
      });
    }
  };

  const handleUpdate = (cafeteria) => {
    setSelectedCafeteria(cafeteria);
    setUpdatedCafeteriaData({
      nom: cafeteria.nom,
      adresse: cafeteria.adresse,
      telephone: cafeteria.telephone,
      description: cafeteria.description,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = () => {
    dispatch(updateCafeteria(selectedCafeteria._id, updatedCafeteriaData)).then(() => {
      setIsUpdateModalOpen(false);
      setSelectedCafeteria(null);
      setUpdatedCafeteriaData({
        nom: '',
        adresse: '',
        telephone: '',
        description: '',
      });
      Toastify('Cafeteria updated successfully', 'success');
      dispatch(fetchCafeterias());
    }).catch(() => {
      Toastify('Failed to update cafeteria', 'error');
    });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="cafeteria-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">
      {cafeterias && cafeterias.map((cafeteria) => (
        <div
          key={cafeteria._id}
          className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-2 flex flex-col"
        >
          <div className="w-full h-48">
            <img
              src={`http://localhost:5000${cafeteria.image}`}
              alt={cafeteria.nom}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-gray-800 text-lg font-bold">{cafeteria.nom}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-grow">
              {cafeteria.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-gray-500">Télé: {cafeteria.telephone}</p>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-rose-600 hover:bg-rose-700 active:bg-rose-600"
                onClick={() => navigate(`/cafeteriaDetails/${cafeteria._id}`)}
              >
                détails
              </button>
            </div>
            {(user && user.role === 'superadmin') && (
              <div className="flex justify-end space-x-2 mt-2">
                <button onClick={() => handleUpdate(cafeteria)} className="p-1 bg-blue-500 text-white rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(cafeteria._id)} className="p-1 bg-red-500 text-white rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Cafeteria</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={updatedCafeteriaData.nom}
                onChange={(e) => setUpdatedCafeteriaData({ ...updatedCafeteriaData, nom: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="adresse"
                value={updatedCafeteriaData.adresse}
                onChange={(e) => setUpdatedCafeteriaData({ ...updatedCafeteriaData, adresse: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
              <input
                type="text"
                id="telephone"
                value={updatedCafeteriaData.telephone}
                onChange={(e) => setUpdatedCafeteriaData({ ...updatedCafeteriaData, telephone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={updatedCafeteriaData.description}
                onChange={(e) => setUpdatedCafeteriaData({ ...updatedCafeteriaData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsUpdateModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleUpdateSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CafeteriaCard;
