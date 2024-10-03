import { Router } from 'express';
import {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
} from '../controllers/authorController';

const router = Router();

// Rotta per creare un nuovo autore
router.post('/authors', createAuthor);

// Rotta per ottenere tutti gli autori
router.get('/authors', getAuthors);

// Rotta per ottenere un autore per ID
router.get('/authors/:id', getAuthorById);

// Rotta per aggiornare un autore per ID
router.put('/authors/:id', updateAuthor);

// Rotta per eliminare un autore per ID
router.delete('/authors/:id', deleteAuthor);

export default router;
