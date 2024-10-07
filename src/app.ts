import Fastify from 'fastify';
import cors from '@fastify/cors';
import articleRoutes from './routes/articleRoutes';
import authorRoutes from './routes/authorRoutes';
import workRoutes from './routes/workRoutes';
import literatureRoutes from './routes/literatureRoutes';
import historySectionRoutes from './routes/historySectionRoutes';

const fastify = Fastify();

async function startServer() {
    // Abilita CORS per tutte le richieste
    try {
        await fastify.register(cors);

        // Aggiungi una rotta di base per verificare che il server funzioni
        fastify.get('/', async (request, reply) => {
            reply.send('Backend attivo');
        });

        // Registra le rotte
        fastify.register(articleRoutes, { prefix: '/api' });
        fastify.register(authorRoutes, { prefix: '/api' });
        fastify.register(workRoutes, { prefix: '/api' });
        fastify.register(literatureRoutes, { prefix: '/api' });
        fastify.register(historySectionRoutes, { prefix: '/api' });

        // Gestisci le rotte non trovate (404)
        fastify.setNotFoundHandler((request, reply) => {
            reply.status(404).send('Errore 404: Risorsa non trovata');
        });

        // Avvia il server Fastify
        const address = await fastify.listen({ port: 5000 });
        console.log(`Server running on ${address}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();
