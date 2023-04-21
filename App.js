require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users'); // Importa las rutas de usuarios

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/users', usersRoutes); // Utiliza las rutas de usuarios

app.get('/', (req, res) => {
    res.send('Hello, Prometeo backend!');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

