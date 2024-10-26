import app from './app.js';
import config from '../config/config.js';
import connectDB from '../config/database.js';

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});