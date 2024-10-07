import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Definire l'interfaccia per il corpo della richiesta per creare o aggiornare un autore
interface AuthorBody {
    name: string;
    biography?: string;
}

// Creare un autore senza immagini
export const createAuthor = async (
    request: FastifyRequest<{ Body: AuthorBody }>, 
    reply: FastifyReply
) => {
    const { name, biography } = request.body;

    try {
        const existingAuthor = await prisma.author.findFirst({
            where: { name },
        });

        if (existingAuthor) {
            return reply.status(409).send({ error: 'An author with this name already exists' });
        }

        const author = await prisma.author.create({
            data: {
                name,
                biography,
            },
        });

        reply.status(201).send(author);
    } catch (error) {
        console.error('Error creating author:', error);
        reply.status(400).send({ error: 'Failed to create author' });
    }
};

// Recuperare tutti gli autori
export const getAuthors = async (
    request: FastifyRequest, 
    reply: FastifyReply
) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                works: true,  // Include i lavori dell'autore
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        reply.status(200).send(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
        reply.status(500).send({ error: 'Failed to fetch authors' });
    }
};

// Recuperare un singolo autore per ID
export const getAuthorById = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        const author = await prisma.author.findUnique({
            where: { id },
            include: {
                works: true,
            },
        });

        if (!author) {
            return reply.status(404).send({ error: 'Author not found' });
        }

        reply.status(200).send(author);
    } catch (error) {
        console.error('Error fetching author:', error);
        reply.status(500).send({ error: 'Failed to fetch author' });
    }
};

// Aggiornare un autore senza immagini
export const updateAuthor = async (
    request: FastifyRequest<{ Params: { id: string }; Body: AuthorBody }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    const { name, biography } = request.body;

    try {
        const author = await prisma.author.update({
            where: { id },
            data: {
                name,
                biography,
            },
        });

        reply.status(200).send(author);
    } catch (error) {
        console.error('Error updating author:', error);
        reply.status(500).send({ error: 'Failed to update author' });
    }
};

// Eliminare un autore
export const deleteAuthor = async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        await prisma.author.delete({
            where: { id },
        });

        reply.status(204).send();
    } catch (error) {
        console.error('Error deleting author:', error);
        reply.status(500).send({ error: 'Failed to delete author' });
    }
};
