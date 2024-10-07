import {
    createLiterature,
    getLiteratures,
    getLiteratureById,
    updateLiterature,
    deleteLiterature,
} from '../controllers/literatureController';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

// Definisci l'interfaccia per il corpo della richiesta
interface LiteratureBody {
    authorId: string;
    workId: string;
}

export default async function literatureRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Rotta per creare una nuova relazione letteraria senza immagini
    fastify.post('/literatures', async (request: FastifyRequest<{ Body: LiteratureBody }>, reply: FastifyReply) => {
        return createLiterature(request, reply);
    });

    // Rotta per ottenere tutte le relazioni letterarie
    fastify.get('/literatures', async (request: FastifyRequest, reply: FastifyReply) => {
        return getLiteratures(request, reply);
    });

    // Rotta per ottenere una relazione letteraria per ID
    fastify.get('/literatures/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return getLiteratureById(request, reply);
    });

    // Rotta per aggiornare una relazione letteraria per ID senza immagini
    fastify.put('/literatures/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: LiteratureBody }>, reply: FastifyReply) => {
        return updateLiterature(request, reply);
    });

    // Rotta per eliminare una relazione letteraria per ID
    fastify.delete('/literatures/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return deleteLiterature(request, reply);
    });
}
