import express from 'express';
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

// Aggiungi una rotta di base per verificare che il server funzioni
app.get('/', (req, res) => {
  res.send('Backend attivo');
});

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

// Gestisci le rotte non trovate (404)
app.use((req, res) => {
  res.status(404).send('Errore 404: Risorsa non trovata');
});


