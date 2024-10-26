import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ['user', 'gerant', 'superadmin'], default: 'user' },
    cafeteria: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafeteria' },
  });

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

const User = mongoose.model('User', userSchema);

export default User;