import mongoose from 'mongoose';

const cafeteriaSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  gerant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

export default mongoose.model('Cafeteria', cafeteriaSchema);