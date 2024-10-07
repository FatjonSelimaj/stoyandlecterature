import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Creare un articolo senza immagini
export const createArticle = async (request: FastifyRequest<{ Body: { title: string; content: string; category: string } }>, reply: FastifyReply) => {
    const { title, content, category } = request.body;

    try {
        // Controlla se l'articolo con lo stesso titolo esiste già
        const existingArticle = await prisma.article.findFirst({
            where: { title },
        });

        if (existingArticle) {
            return reply.status(409).send({ error: 'Article with this title already exists' });
        }

        // Creazione dell'articolo senza gestire immagini
        const article = await prisma.article.create({
            data: {
                title,
                content,
                category,
            },
        });

        return reply.status(201).send(article);
    } catch (error) {
        console.error('Error creating article:', error);
        return reply.status(400).send({ error: 'Failed to create article' });
    }
};

// Recuperare tutti gli articoli
export const getArticles = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });

        reply.status(200).send(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        reply.status(500).send({ error: 'Failed to fetch articles' });
    }
};

// Recuperare articoli per categoria
export const getArticlesByCategory = async (request: FastifyRequest<{ Params: { category: string } }>, reply: FastifyReply) => {
    const { category } = request.params;
    try {
        const articles = await prisma.article.findMany({
            where: { category },
            orderBy: { createdAt: 'desc' },
        });

        reply.status(200).send(articles);
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        reply.status(500).send({ error: 'Failed to fetch articles' });
    }
};

// Aggiornare un articolo senza immagini
export const updateArticle = async (request: FastifyRequest<{ Params: { id: string }; Body: { title: string; content: string; category: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { title, content, category } = request.body;

    try {
        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                content,
                category,
            },
        });

        return reply.status(200).send(article);
    } catch (error) {
        console.error('Error updating article:', error);
        return reply.status(500).send({ error: 'Failed to update article' });
    }
};

// Eliminare un articolo
export const deleteArticle = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    try {
        await prisma.article.delete({
            where: { id },
        });

        reply.status(204).send();  // Nessun contenuto, operazione avvenuta con successo
    } catch (error) {
        console.error('Error deleting article:', error);
        reply.status(500).send('Failed to delete article');
    }
};

// Recuperare un singolo articolo per ID
export const getArticleById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    try {
        const article = await prisma.article.findUnique({
            where: { id },
        });

        // Restituisci un errore 404 se l'articolo non viene trovato
        if (!article) {
            return reply.status(404).send({ error: 'Article not found' });
        }

        reply.status(200).send(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        reply.status(500).send({ error: 'Failed to fetch article' });
    }
};
