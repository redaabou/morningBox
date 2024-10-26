import Cafeteria from '../models/cafeteria.js';
import User from '../models/user.js';

export const getAllCafeterias = async (req, res) => {
  try {
    const cafeterias = await Cafeteria.find().populate('menus');;
    res.json(cafeterias);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cafétérias' });
  }
};

export const getCafeteria = async (req, res) => {
  const { id } = req.params;
  try {
    const cafeteria = await Cafeteria.findById(id).populate('menus');
    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafétéria non trouvée' });
    }
    res.json(cafeteria);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la cafétéria' });
  }
};

// get cafeterias by gerant
export const getCafeteriasByGerant = async (req, res) => {
  const { id } = req.params;
  try {
    const gerant = await User.findById(id);
    if (!gerant || gerant.role !== 'gerant') {
      return res.status(404).json({ message: 'Gérant non trouvé ou rôle invalide' });
    }

    const cafeterias = await Cafeteria.find({ gerant: id }).populate('menus');
    res.json(cafeterias);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cafétérias', error: error.message });
  }
}




export const createCafeteria = async (req, res) => {
  try {
    const cafeteria = await Cafeteria.create(req.body);
    console.log(cafeteria);
    res.status(201).json(cafeteria);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la cafétéria' });
  }
};

export const updateCafeteria = async (req, res) => {
  try {
    const cafeteria = await Cafeteria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafétéria non trouvée' });
    }
    res.json(cafeteria);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la cafétéria' });
  }
};

export const deleteCafeteria = async (req, res) => {
  try {
    const cafeteria = await Cafeteria.findByIdAndDelete(req.params.id);
    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafétéria non trouvée' });
    }
    res.json({ message: 'Cafétéria supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la cafétéria' });
  }
};

export const assignManager = async (req, res) => {
  try {
    const { cafeteriaId, gerantId } = req.body;

    // Check if the cafeteria exists
    const cafeteria = await Cafeteria.findById(cafeteriaId);
    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafétéria non trouvée' });
    }

    // Check if the user (gerant) exists and is a manager
    const gerant = await User.findById(gerantId);
    if (!gerant || gerant.role !== 'gerant') {
      return res.status(404).json({ message: 'Gérant non trouvé ou rôle invalide' });
    }
    
    // Check if the gerant already has an assigned cafeteria
    if (gerant.cafeteria) {
      return res.status(400).json({ message: 'Ce gérant est déjà assigné à une cafétéria' });
    }
  

    // Assign the manager to the cafeteria
    cafeteria.gerant = gerantId;
    await cafeteria.save();

    // Update the user's cafeteria reference
    gerant.cafeteria = cafeteriaId;
    await gerant.save();

    res.json({ message: 'Gérant assigné avec succès à la cafétéria', cafeteria, gerant });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'assignation du gérant', error: error.message });
  }
};