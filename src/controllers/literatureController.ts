import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Definisci l'interfaccia per il corpo della richiesta
interface LiteratureBody {
    authorId: string;
    workId: string;
}

// Crea una nuova relazione letteraria senza immagini
export const createLiterature = async (
    request: FastifyRequest<{ Body: LiteratureBody }>, 
    reply: FastifyReply
) => {
    try {
        const { authorId, workId } = request.body;

        // Verifica se esiste già la relazione letteraria per evitare duplicati
        const existingLiterature = await prisma.literature.findFirst({
            where: { authorId, workId },
        });

        if (existingLiterature) {
            return reply.status(409).send({ error: 'This literature entry already exists' });
        }

        const literature = await prisma.literature.create({
            data: {
                authorId,
                workId,
            },
        });

        reply.status(201).send(literature);
    } catch (error) {
        console.error('Error creating literature:', error);
        reply.status(400).send({ error: 'Failed to create literature' });
    }
};

// Recupera tutte le relazioni letterarie
export const getLiteratures = async (
    request: FastifyRequest, 
    reply: FastifyReply
) => {
    try {
        const literatures = await prisma.literature.findMany({
            where: {
                AND: [
                    { authorId: { not: null } },  // Assicurati che authorId non sia null
                    { workId: { not: null } },    // Assicurati che workId non sia null
                ],
            },
            include: {
                author: true,  // Include i dettagli dell'autore
                work: true,    // Include i dettagli dell'opera
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        reply.status(200).send(literatures);
    } catch (error) {
        console.error('Error fetching literatures:', error);
        reply.status(500).send({ error: 'Failed to fetch literatures' });
    }
};

// Recupera una singola relazione letteraria per ID
export const getLiteratureById = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        const literature = await prisma.literature.findUnique({
            where: { id },
            include: {
                author: true,
                work: true,
            },
        });

        if (!literature) {
            return reply.status(404).send({ error: 'Literature not found' });
        }

        reply.status(200).send(literature);
    } catch (error) {
        console.error('Error fetching literature:', error);
        reply.status(500).send({ error: 'Failed to fetch literature' });
    }
};

// Aggiorna una relazione letteraria per ID senza immagini
export const updateLiterature = async (
    request: FastifyRequest<{ Params: { id: string }; Body: LiteratureBody }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    const { authorId, workId } = request.body;

    try {
        const literature = await prisma.literature.update({
            where: { id },
            data: {
                authorId,
                workId,
            },
        });

        reply.status(200).send(literature);
    } catch (error) {
        console.error('Error updating literature:', error);
        reply.status(400).send({ error: 'Failed to update literature' });
    }
};

// Elimina una relazione letteraria per ID
export const deleteLiterature = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        await prisma.literature.delete({
            where: { id },
        });

        reply.status(204).send();
    } catch (error) {
        console.error('Error deleting literature:', error);
        reply.status(500).send({ error: 'Failed to delete literature' });
    }
};
