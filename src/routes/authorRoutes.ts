import {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
} from '../controllers/authorController';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

// Definisci l'interfaccia per il corpo della richiesta
interface AuthorBody {
    name: string;
    biography?: string;
}

export default async function authorRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Rotta per creare un nuovo autore
    fastify.post('/authors', async (request: FastifyRequest<{ Body: AuthorBody }>, reply: FastifyReply) => {
        return createAuthor(request, reply);
    });

    // Rotta per ottenere tutti gli autori
    fastify.get('/authors', async (request: FastifyRequest, reply: FastifyReply) => {
        return getAuthors(request, reply);
    });

    // Rotta per ottenere un autore per ID
    fastify.get('/authors/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return getAuthorById(request, reply);
    });

    // Rotta per aggiornare un autore per ID
    fastify.put('/authors/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: AuthorBody }>, reply: FastifyReply) => {
        return updateAuthor(request, reply);
    });

    // Rotta per eliminare un autore per ID
    fastify.delete('/authors/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return deleteAuthor(request, reply);
    });
}
