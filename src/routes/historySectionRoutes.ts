import {
    createHistorySection,
    getHistorySections,
    getHistorySectionById,
    updateHistorySection,
    deleteHistorySection,
} from '../controllers/historySectionController';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

// Definisci l'interfaccia per il corpo della richiesta
interface HistorySectionBody {
    title: string;
    description: string;
    historicalPeriod: string;
}

export default async function historySectionRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Rotta per creare una nuova sezione storica
    fastify.post('/history-sections', async (request: FastifyRequest<{ Body: HistorySectionBody }>, reply: FastifyReply) => {
        return createHistorySection(request, reply);
    });

    // Rotta per ottenere tutte le sezioni storiche
    fastify.get('/history-sections', async (request: FastifyRequest, reply: FastifyReply) => {
        return getHistorySections(request, reply);
    });

    // Rotta per ottenere una sezione storica per ID
    fastify.get('/history-sections/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return getHistorySectionById(request, reply);
    });

    // Rotta per aggiornare una sezione storica per ID
    fastify.put('/history-sections/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: HistorySectionBody }>, reply: FastifyReply) => {
        return updateHistorySection(request, reply);
    });

    // Rotta per eliminare una sezione storica per ID
    fastify.delete('/history-sections/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return deleteHistorySection(request, reply);
    });
}
