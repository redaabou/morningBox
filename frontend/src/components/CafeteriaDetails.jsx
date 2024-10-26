import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCafeteriaDetails } from '../redux/actions/cafeteriaActions';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function CafeteriaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cafeteria, loading, error } = useSelector((state) => state.cafeteria.cafeteriaDetails);
  
  useEffect(() => {
    dispatch(fetchCafeteriaDetails(id));
  }, [dispatch, id]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!cafeteria) return <div>Aucune donnée disponible</div>;
  
  return (
<main>
      <div className="bg-gray-800 font-[sans-serif] p-6">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-5xl max-md:max-w-md mx-auto">
        <div className="md:h-[400px]">
          <img src={`http://localhost:5000${cafeteria.image}`} alt="Cafeteria" className="w-full h-full object-cover rounded-lg" />
        </div>

        <div className="max-md:text-center">
          <h3 className="text-white font-semibold md:text-3xl text-2xl md:leading-10">{cafeteria.nom}</h3>
          <p className="text-gray-300 mt-4 text-sm leading-relaxed">{cafeteria.description}</p>
          <div className="text-gray-300 mt-4 text-sm leading-relaxed flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {cafeteria.adresse}
          </div>
          <div className="text-gray-300 mt-2 text-sm leading-relaxed flex items-center">
            <FaPhoneAlt className="mr-2" /> {cafeteria.telephone}
          </div>
        </div>
      </div>
    </div>
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-center mb-6 sm:mb-6 text-rose-600">Menu de la Cafeteria</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cafeteria.menus.map((menu) => (
            <div key={menu.id} className="bg-[#ffffff] border-black border-2 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="relative">
                <img src={"https://st3.depositphotos.com/1267918/12612/v/950/depositphotos_126124120-stock-illustration-restaurant-menu-card-design.jpg"} className="w-full h-36 sm:h-44 md:h-52 object-cover" alt={menu.nom} />
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-black">{menu.nom}</h2>
                  <span className="bg-rose-border-rose-600 text-black text-xs sm:text-sm font-semibold px-2 py-1 rounded">{menu.prix} Dh</span>
                </div>
                <p className="text-black mb-2 sm:mb-3 italic text-xs sm:text-sm">{menu.description}</p>
                {menu.items && menu.items.length > 0 && (
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-rose-700 mb-1">Accompaniments:</h4>
                    <ul className="space-y-1">
                      {menu.items.map((item) => (
                        <li key={item.nom} className="text-xs sm:text-sm flex justify-between text-black">
                          <span>{item.nom}</span>
                          <span className="font-medium">{item.prix} Dh</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
</main>
    
  );
}

export default CafeteriaDetails;