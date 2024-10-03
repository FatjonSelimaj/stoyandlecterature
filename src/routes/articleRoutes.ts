import { Router } from 'express';
import {
    createArticle,
    getArticles,
    getArticlesByCategory,
    getArticleById,
    updateArticle,
    deleteArticle,
} from '../controllers/articleController';

const router = Router();

// Rotta per creare un nuovo articolo
router.post('/articles', createArticle);

// Rotta per ottenere tutti gli articoli
router.get('/articles', getArticles);

// Rotta per ottenere articoli per categoria
router.get('/articles/category/:category', getArticlesByCategory);

// Rotta per ottenere un articolo per ID (corretto)
router.get('/articles/:id', getArticleById);

// Rotta per aggiornare un articolo per ID
router.put('/articles/:id', updateArticle);

// Rotta per eliminare un articolo per ID
router.delete('/articles/:id', deleteArticle);

export default router;
