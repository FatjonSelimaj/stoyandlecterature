import { createWork, deleteWork, getWorkById, getWorks, updateWork } from '../controllers/workController';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

interface WorkParams {
  id: string;
}

interface WorkBody {
  title: string;
  genre: string;
  authorId: string | null;
  links: string[];
}

export default async function workRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Rotta per creare una nuova opera senza immagini
  fastify.post('/works', async (request: FastifyRequest<{ Body: WorkBody }>, reply: FastifyReply) => {
    return createWork(request, reply);
  });

  // Rotta per ottenere tutte le opere
  fastify.get('/works', async (request: FastifyRequest, reply: FastifyReply) => {
    return getWorks(request, reply);
  });

  // Rotta per ottenere un'opera specifica per ID
  fastify.get('/works/:id', async (request: FastifyRequest<{ Params: WorkParams }>, reply: FastifyReply) => {
    return getWorkById(request, reply);
  });

  // Rotta per aggiornare un'opera specifica per ID senza immagini
  fastify.put('/works/:id', async (request: FastifyRequest<{ Params: WorkParams; Body: WorkBody }>, reply: FastifyReply) => {
    return updateWork(request, reply);
  });

  // Rotta per eliminare un'opera specifica per ID
  fastify.delete('/works/:id', async (request: FastifyRequest<{ Params: WorkParams }>, reply: FastifyReply) => {
    return deleteWork(request, reply);
  });
}
