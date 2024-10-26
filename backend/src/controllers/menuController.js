import Menu from "../models/menu.js";
import Cafeteria from "../models/cafeteria.js";
import mongoose from 'mongoose';

// Create a new menu associated with a specific cafeteria
export const createMenu = async (req, res) => {
  const { cafeteriaId, items, ...menuData } = req.body;
  console.log("Received Cafeteria ID:", cafeteriaId);
  try {
    // Check if the cafeteria exists
    const cafeteria = await Cafeteria.findById(cafeteriaId);
    if (!cafeteria) {
      return res.status(404).json({ message: "Cafeteria not found" });
    }

    // Create the menu with the provided data plus the cafeteriaId
    const newMenu = new Menu({
      ...menuData,
      items,
      cafeteria: cafeteriaId,
    });

    await newMenu.save();

     // Add the new menu's ID to the cafeteria's menus array
     cafeteria.menus.push(newMenu._id);
     await cafeteria.save();
     
    res.status(201).json({ message: "Menu created successfully", newMenu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menus
export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menus for a specific cafeteria
export const getMenusByCafeteria = async (req, res) => {
  const { cafeteriaId } = req.params;

  try {
    const menus = await Menu.find({ cafeteria: cafeteriaId });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// deleteMenu, updateMenu, markMenuAsEpuisé 
export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body
    , { new: true });
    res.status(200).json(updatedMenu);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const markMenuAsEpuisé = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    menu.disponible = !menu.disponible;
    await menu.save();
    res.status(200).json({ message: `Menu marked as ${menu.disponible ? 'disponible' : 'epuisé'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get menu
export const getMenu = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id.trim())) {
      return res.status(400).json({ message: 'Invalid menu ID' });
    }

    const menu = await Menu.findById(id.trim());
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};