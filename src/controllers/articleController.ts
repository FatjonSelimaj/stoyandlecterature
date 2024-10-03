import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Creare un articolo senza immagini
export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    const { title, content, category } = req.body;

    try {
        // Controlla se l'articolo con lo stesso titolo esiste già
        const existingArticle = await prisma.article.findFirst({
            where: { title },
        });

        if (existingArticle) {
            return res.status(409).json({ error: 'Article with this title already exists' });
        }

        // Creazione dell'articolo senza gestire immagini
        const article = await prisma.article.create({
            data: {
                title,
                content,
                category,
            },
        });

        return res.status(201).json(article);
    } catch (error) {
        console.error('Error creating article:', error);
        return res.status(400).json({ error: 'Failed to create article' });
    }
};

// Recuperare tutti gli articoli
export const getArticles = async (req: Request, res: Response) => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

// Recuperare articoli per categoria
export const getArticlesByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
        const articles = await prisma.article.findMany({
            where: { category },
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

// Aggiornare un articolo senza immagini
export const updateArticle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    try {
        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                content,
                category,
            },
        });

        return res.status(200).json(article);
    } catch (error) {
        console.error('Error updating article:', error);
        return res.status(500).json({ error: 'Failed to update article' });
    }
};

// Eliminare un articolo
export const deleteArticle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.article.delete({
            where: { id },
        });

        res.status(204).send();  // Nessun contenuto, operazione avvenuta con successo
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send('Failed to delete article');
    }
};

// Recuperare un singolo articolo per ID
export const getArticleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const article = await prisma.article.findUnique({
            where: { id },
        });

        // Restituisci un errore 404 se l'articolo non viene trovato
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
};

