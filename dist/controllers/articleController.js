"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleById = exports.deleteArticle = exports.updateArticle = exports.getArticlesByCategory = exports.getArticles = exports.createArticle = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Creare un articolo senza immagini
const createArticle = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error creating article:', error);
        return res.status(400).json({ error: 'Failed to create article' });
    }
};
exports.createArticle = createArticle;
// Recuperare tutti gli articoli
const getArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(articles);
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};
exports.getArticles = getArticles;
// Recuperare articoli per categoria
const getArticlesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const articles = await prisma.article.findMany({
            where: { category },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(articles);
    }
    catch (error) {
        console.error('Error fetching articles by category:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};
exports.getArticlesByCategory = getArticlesByCategory;
// Aggiornare un articolo senza immagini
const updateArticle = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error updating article:', error);
        return res.status(500).json({ error: 'Failed to update article' });
    }
};
exports.updateArticle = updateArticle;
// Eliminare un articolo
const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.article.delete({
            where: { id },
        });
        res.status(204).send(); // Nessun contenuto, operazione avvenuta con successo
    }
    catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send('Failed to delete article');
    }
};
exports.deleteArticle = deleteArticle;
// Recuperare un singolo articolo per ID
const getArticleById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
};
exports.getArticleById = getArticleById;
