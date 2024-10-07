import {
    createArticle,
    getArticles,
    getArticlesByCategory,
    getArticleById,
    updateArticle,
    deleteArticle,
} from '../controllers/articleController';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

// Definisci l'interfaccia per il corpo della richiesta per creare o aggiornare un articolo
interface ArticleBody {
    title: string;
    content: string;
    category: string;
}

export default async function articleRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Rotta per creare un nuovo articolo
    fastify.post('/articles', async (request: FastifyRequest<{ Body: ArticleBody }>, reply: FastifyReply) => {
        return createArticle(request, reply);
    });

    // Rotta per ottenere tutti gli articoli
    fastify.get('/articles', async (request: FastifyRequest, reply: FastifyReply) => {
        return getArticles(request, reply);
    });

    // Rotta per ottenere articoli per categoria
    fastify.get('/articles/category/:category', async (request: FastifyRequest<{ Params: { category: string } }>, reply: FastifyReply) => {
        return getArticlesByCategory(request, reply);
    });

    // Rotta per ottenere un articolo per ID
    fastify.get('/articles/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return getArticleById(request, reply);
    });

    // Rotta per aggiornare un articolo per ID
    fastify.put('/articles/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: ArticleBody }>, reply: FastifyReply) => {
        return updateArticle(request, reply);
    });

    // Rotta per eliminare un articolo per ID
    fastify.delete('/articles/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return deleteArticle(request, reply);
    });
}
