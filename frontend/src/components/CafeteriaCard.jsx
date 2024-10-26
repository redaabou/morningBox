import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCafeterias, fetchGerantCafeteria } from '../redux/actions/cafeteriaActions';
import { useNavigate } from 'react-router-dom';

function CafeteriaCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { cafeterias, loading, error } = useSelector((state) => state.cafeteria);
  
  useEffect(() => {
    dispatch(fetchCafeterias());
    if (user && user.role === 'gerant') {
        dispatch(fetchGerantCafeteria(user.id));
    }
  }, [dispatch, user]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  
  return (
    <div className="cafeteria-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">
      {cafeterias && cafeterias.map((cafeteria) => (
        <div
          key={cafeteria._id}
          className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-2 flex flex-col"
        >
          <div className="w-full h-48"> {/* Set a fixed height for the image container */}
            <img
              src={`http://localhost:5000${cafeteria.image}`}
              alt={cafeteria.nom}
              className="w-full h-full object-cover" // Ensure the image covers the container
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-gray-800 text-lg font-bold">{cafeteria.nom}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-grow">
              {cafeteria.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Télé: {cafeteria.telephone}
              </p>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-rose-600 hover:bg-rose-700 active:bg-rose-600"
                onClick={() => navigate(`/cafeteriaDetails/${cafeteria._id}`)}
              >
                détails
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CafeteriaCard;