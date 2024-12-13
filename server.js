const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const users = require('./routes/users');
const places = require('./routes/places');
const regions = require('./routes/regions');
const reviews = require('./routes/reviews');
const categories = require('./routes/categories');
const place_types = require('./routes/others/place_types');

// Importar client de la base de datos
const client = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de multer para la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas existentes
app.use(users);
app.use(places);
app.use(regions);
app.use(reviews);
app.use(categories);
app.use(place_types);
app.use('/uploads', express.static('uploads'));

// Nueva ruta para subir imágenes
app.post('/upload', upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;

  try {
    await client.query('INSERT INTO images (name, data) VALUES ($1, $2)', [originalname, buffer]);
    res.send({ message: 'Imagen subida exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al subir la imagen' });
  }
});

// Nueva ruta para obtener imágenes
app.get("/api/v1/images", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tb_place_images');
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al obtener las imágenes' });
  }
});

app.listen(4000, () => {
  console.log('Server running on port: 4000');
});
