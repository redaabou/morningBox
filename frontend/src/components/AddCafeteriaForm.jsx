import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCafeteria } from '../redux/actions/cafeteriaActions';

function AddCafeteriaForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    telephone: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    dispatch(createCafeteria(data));
  };

  return (
    <main className='AddMenuMain'>
      <h1 className="m-0 mb-5">Add Cafeteria</h1>
      <form className="AddMenuForm" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Nom</label>
          <input
            type="text"
            name="nom"
            placeholder="Enter cafeteria name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Adresse</label>
          <input
            type="text"
            name="adresse"
            placeholder="Enter address"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Telephone</label>
          <input
            type="text"
            name="telephone"
            placeholder="Enter phone number"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Image</label>
          <input
            type="file"
            name="image"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="!mt-8 px-6 py-2 w-full bg-rose-600 hover:bg-rose-700 text-sm text-white mx-auto block"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default AddCafeteriaForm;