import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus, deleteMenu, updateMenu, markMenuAsEpuisé } from '../redux/actions/menuActions';
import { fetchGerantCafeteria } from '../redux/actions/cafeteriaActions';
import Toastify from '../utils/Toastify';

function MenusList() {
  const dispatch = useDispatch();
  const { menus, loading, error } = useSelector((state) => state.menu);
  const { user } = useSelector(state => state.auth);
  const { cafeterias } = useSelector((state) => state.cafeteria);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [updatedMenuData, setUpdatedMenuData] = useState({
    nom: '',
    description: '',
    prix: '',
  });



  useEffect(() => {
    if (user.role === 'superadmin') {
      dispatch(fetchMenus());
    } else if (user.role === 'gerant') {
      dispatch(fetchGerantCafeteria(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      dispatch(deleteMenu(id));
    }
    
  };

  const handleUpdate = (menu) => {
    setSelectedMenu(menu);
    setUpdatedMenuData({
      nom: menu.nom,
      description: menu.description,
      prix: menu.prix,
    });
    

    setIsUpdateModalOpen(true);
    
  };

  const handleUpdateSubmit = () => {
    dispatch(updateMenu(selectedMenu._id, updatedMenuData)).then(() => {
      setIsUpdateModalOpen(false);
      setSelectedMenu(null);
      setUpdatedMenuData({
        nom: '',
        description: '',
        prix: '',
      });
      
      dispatch(fetchMenus());
    });
  }


  const handleToggleAvailability = (id, currentStatus) => {
    dispatch(markMenuAsEpuisé(id, !currentStatus));
    dispatch(fetchMenus());
  };




  if (loading) return <div className="flex justify-center items-center h-screen ml-[15px]">Loading...</div>;
  if (error) return <div className="text-red-500 text-center ml-[15px]">{error}</div>;

  const displayedMenus = user.role === 'gerant' ? cafeterias[0]?.menus : menus;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-center mb-4 sm:mb-6 text-rose-500">Our Exquisite Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedMenus && displayedMenus.map((menu) => (
            <div key={menu._id} className="relative bg-[#ffffff] border-rose-600 border-2 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="relative">
                <img src={"https://st3.depositphotos.com/1267918/12612/v/950/depositphotos_126124120-stock-illustration-restaurant-menu-card-design.jpg"} className="w-full h-36 sm:h-44 md:h-52 object-cover" alt={menu.nom} />
                {!menu.disponible && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <span className="text-white text-lg font-bold">Not Available</span>
                  </div>
                )}
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
                        <li key={item._id} className="text-xs sm:text-sm flex justify-between text-black">
                          <span>{item.nom}</span>
                          <span className="font-medium">{item.prix} Dh</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(user.role === 'superadmin' || user.role === 'gerant') && (
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleUpdate(menu)} className="p-1 bg-blue-500 text-white rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleToggleAvailability(menu._id, menu.disponible)} 
                      className="p-1 bg-yellow-500 text-white rounded"
                    >
                      {menu.disponible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <button onClick={() => handleDelete(menu._id)} className="p-1 bg-red-500 text-white rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Menu</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={updatedMenuData.nom}
                onChange={(e) => setUpdatedMenuData({ ...updatedMenuData, nom: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={updatedMenuData.description}
                onChange={(e) => setUpdatedMenuData({ ...updatedMenuData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                
                id="price"
                value={updatedMenuData.prix}
                onChange={(e) => setUpdatedMenuData({ ...updatedMenuData, prix: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsUpdateModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleUpdateSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenusList;