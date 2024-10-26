import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCafeterias } from "../redux/actions/cafeteriaActions";
import { createMenu } from "../redux/actions/menuActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import  Toastify  from "../utils/Toastify";
import MenusList from "./MenusList";

function AddMenuForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cafeterias, loading, error } = useSelector(
    (state) => state.cafeteria
  );
  const creatMenuSelctor = useSelector((state) => state.menu.createMenu);

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: 0,
    disponible: true,
    cafeteriaId: "",
    items: [{ nom: "", prix: 0 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { nom: "", prix: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMenu(formData));
  };

  useEffect(() => {
    dispatch(fetchCafeterias());
  }, [dispatch]);



  useEffect(() => {
    if (creatMenuSelctor && creatMenuSelctor.success) {
      Toastify("Menu created successfully", "success");
      setFormData({
        nom: "",
        description: "",
        prix: 0,
        disponible: true,
        cafeteriaId: "",
        items: [{ nom: "", prix: 0 }],
      }
      
    );

    }else if (creatMenuSelctor && creatMenuSelctor.error) {
      Toastify(creatMenuSelctor.error, "error");
    }
  }, [creatMenuSelctor]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <main className="AddMenuMain">
      <h1 className="m-0 mb-5">Add Menu</h1>
      <form className="AddMenuForm" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Nom</label>
          <input
            type="text"
            placeholder="Enter menu name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Prix</label>
          <input
            type="number"
            placeholder="Enter price"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Disponible</label>
          <select
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="disponible"
            value={formData.disponible}
            onChange={handleChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Cafeteria</label>
          <select
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="cafeteriaId"
            value={formData.cafeteriaId}
            onChange={handleChange}
            required
          >
            <option value="">Select cafeteria</option>
            {cafeterias.map((cafeteria) => (
              <option key={cafeteria._id} value={cafeteria._id}>
                {cafeteria.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex flex-col mb-2">
              <input
                type="text"
                placeholder="Item name"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white mb-2"
                name="nom"
                value={item.nom}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <input
                type="number"
                placeholder="Item price"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                name="prix"
                value={item.prix}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </div>
          ))}
          {formData.items.length < 5 && (
            <button
              type="button"
              onClick={addItem}
              className="mt-7 ml-5 px-4 py-2 bg-rose-500 text-white rounded"
            >
              Add Item
            </button>
          )}
        </div>

        <button
          type="submit"
          className="!mt-8 px-6 py-2 w-full bg-rose-600 hover:bg-rose-700 text-sm text-white mx-auto block"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </main>
  );
}

export default AddMenuForm;
