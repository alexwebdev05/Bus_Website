// index.ts
import app from './src/app';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});