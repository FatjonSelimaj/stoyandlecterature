import express from 'express';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes';
import authorRoutes from './routes/authorRoutes';
import workRoutes from './routes/workRoutes';
import literatureRoutes from './routes/literatureRoutes';
import historySectionRoutes from './routes/historySectionRoutes';

const app = express();

// Configura CORS per consentire richieste dall'origine del frontend
app.use(cors({
  origin: 'https://storia-letteratura-follower.vercel.app' // Cambia con l'URL corretto del frontend
}));

// Middleware per gestire le richieste JSON
app.use(express.json());

// Aggiungi una rotta di base per verificare che il server funzioni
app.get('/', (req, res) => {
  res.send('Backend attivo');
});

// Usa le rotte degli articoli
app.use('api/articles', articleRoutes);

// Usa le rotte degli autori
app.use('api/authors', authorRoutes);

// Usa le rotte delle opere
app.use('api/works', workRoutes);

// Usa le rotte delle relazioni letterarie
app.use('api/literature', literatureRoutes);

// Usa le rotte delle sezioni storiche
app.use('api/history', historySectionRoutes);

// Gestisci le rotte non trovate (404)
app.use((req, res) => {
  res.status(404).send('Errore 404: Risorsa non trovata');
});

// Esporta la funzione handler per Vercel
export default app;
