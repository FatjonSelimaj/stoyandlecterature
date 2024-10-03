import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Creare un autore senza immagini
export const createAuthor = async (req: Request, res: Response) => {
    const { name, biography } = req.body;

    try {
        const existingAuthor = await prisma.author.findFirst({
            where: { name },
        });

        if (existingAuthor) {
            return res.status(409).json({ error: 'An author with this name already exists' });
        }

        const author = await prisma.author.create({
            data: {
                name,
                biography,
            },
        });

        res.status(201).json(author);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(400).json({ error: 'Failed to create author' });
    }
};

// Recuperare tutti gli autori
export const getAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                works: true,  // Include i lavori dell'autore
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
};

// Recuperare un singolo autore per ID
export const getAuthorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const author = await prisma.author.findUnique({
            where: { id },
            include: {
                works: true,
            },
        });

        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ error: 'Failed to fetch author' });
    }
};

// Aggiornare un autore senza immagini
export const updateAuthor = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, biography } = req.body;

    try {
        const author = await prisma.author.update({
            where: { id },
            data: {
                name,
                biography,
            },
        });

        return res.status(200).json(author);
    } catch (error) {
        console.error('Error updating author:', error);
        return res.status(500).json({ error: 'Failed to update author' });
    }
};

// Eliminare un autore
export const deleteAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.author.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Failed to delete author' });
    }
};
