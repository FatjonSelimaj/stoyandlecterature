import express from 'express';
import axios from 'axios';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes';
import authorRoutes from './routes/authorRoutes';
import workRoutes from './routes/workRoutes';
import literatureRoutes from './routes/literatureRoutes';
import historySectionRoutes from './routes/historySectionRoutes';

const app = express();

// Abilita CORS per tutte le richieste
app.use(cors());

// Middleware per gestire le richieste JSON
app.use(express.json());

// Usa le rotte degli articoli
app.use('/api', articleRoutes);

// Usa le rotte degli autori
app.use('/api', authorRoutes);

// Usa le rotte delle opere
app.use('/api', workRoutes);

// Usa le rotte delle relazioni letterarie
app.use('/api', literatureRoutes);

// Usa le rotte delle sezioni storiche
app.use('/api', historySectionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
