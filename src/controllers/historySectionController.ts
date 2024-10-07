import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Definisci l'interfaccia per il corpo della richiesta
interface HistorySectionBody {
    title: string;
    description: string;
    historicalPeriod: string;
}

// Crea una nuova sezione storica con titolo, descrizione e periodo storico
export const createHistorySection = async (
    request: FastifyRequest<{ Body: HistorySectionBody }>, 
    reply: FastifyReply
) => {
    try {
        const { title, description, historicalPeriod } = request.body;

        // Verifica che tutti i campi richiesti siano presenti
        if (!title || !description || !historicalPeriod) {
            return reply.status(400).send({ error: 'All fields are required: title, description, and historicalPeriod' });
        }

        // Crea la nuova sezione storica
        const historySection = await prisma.historySection.create({
            data: {
                title,
                description,
                historicalPeriod,
                createdAt: new Date(),  // Facoltativo: Prisma imposta automaticamente la data di creazione
            },
        });

        reply.status(201).send(historySection);
    } catch (error) {
        console.error('Error creating history section:', error);
        reply.status(500).send({ error: 'Failed to create history section' });
    }
};

// Ottieni tutte le sezioni storiche
export const getHistorySections = async (
    request: FastifyRequest, 
    reply: FastifyReply
) => {
    try {
        const historySections = await prisma.historySection.findMany({
            orderBy: {
                createdAt: 'desc',  // Ordina per data di creazione
            },
        });

        reply.status(200).send(historySections);
    } catch (error) {
        console.error('Error fetching history sections:', error);
        reply.status(500).send({ error: 'Failed to fetch history sections' });
    }
};

// Ottieni una sezione storica per ID
export const getHistorySectionById = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        const historySection = await prisma.historySection.findUnique({
            where: { id },
        });

        if (!historySection) {
            return reply.status(404).send({ error: 'History section not found' });
        }

        reply.status(200).send(historySection);
    } catch (error) {
        console.error('Error fetching history section by ID:', error);
        reply.status(500).send({ error: 'Failed to fetch history section' });
    }
};

// Aggiorna una sezione storica per ID
export const updateHistorySection = async (
    request: FastifyRequest<{ Params: { id: string }; Body: HistorySectionBody }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    const { title, description, historicalPeriod } = request.body;

    try {
        // Verifica che tutti i campi richiesti siano presenti
        if (!title || !description || !historicalPeriod) {
            return reply.status(400).send({ error: 'All fields are required: title, description, and historicalPeriod' });
        }

        const historySection = await prisma.historySection.update({
            where: { id },
            data: {
                title,
                description,
                historicalPeriod,
            },
        });

        reply.status(200).send(historySection);
    } catch (error) {
        console.error('Error updating history section:', error);
        reply.status(500).send({ error: 'Failed to update history section' });
    }
};

// Elimina una sezione storica per ID
export const deleteHistorySection = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;

    try {
        await prisma.historySection.delete({
            where: { id },
        });

        reply.status(204).send();  // Restituisce 204 (No Content) per successo
    } catch (error) {
        console.error('Error deleting history section:', error);
        reply.status(500).send({ error: 'Failed to delete history section' });
    }
};
