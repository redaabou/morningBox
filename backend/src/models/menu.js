import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true }
});

const menuSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  prix: { type: Number, required: true },
  disponible: { type: Boolean, default: true },
  items: [menuItemSchema],
  cafeteria: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafeteria', required: true },
});

export default mongoose.model('Menu', menuSchema);