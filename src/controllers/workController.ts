import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Crea una nuova opera senza immagini
export const createWork = async (req: Request, res: Response): Promise<Response> => {
    const { title, genre, authorId, links } = req.body;  // Aggiungi i link nel corpo della richiesta

    try {
        const existingWork = await prisma.work.findFirst({ where: { title } });
        if (existingWork) {
            return res.status(409).json({ error: 'Work with this title already exists.' });
        }

        const work = await prisma.work.create({
            data: { title, genre, authorId, links }  // Salva i link nel database
        });

        return res.status(201).json(work);
    } catch (error) {
        console.error('Failed to create work:', error);
        return res.status(400).json({ error: 'Failed to create work.' });
    }
};

// Recupera tutte le opere
export const getWorks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const works = await prisma.work.findMany({
            where: {
                author: {
                    isNot: null,  // Questo filtra i lavori senza autore
                },
            },
            include: {
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json(works);
    } catch (error) {
        console.error('Error fetching works:', error);
        return res.status(500).json({ error: 'Failed to fetch works' });
    }
};

// Recupera una specifica opera per ID
export const getWorkById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const work = await prisma.work.findUnique({
            where: { id },
            include: {
                author: true,
            },
        });

        if (!work) {
            return res.status(404).json({ error: 'Work not found' });
        }

        return res.status(200).json(work);
    } catch (error) {
        console.error('Error fetching work:', error);
        return res.status(500).json({ error: 'Failed to fetch work' });
    }
};

// Aggiorna un'opera per ID senza immagini
export const updateWork = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, genre, authorId, links } = req.body;  // Aggiungi i link nell'input

    try {
        const work = await prisma.work.update({
            where: { id },
            data: { title, genre, authorId, links },  // Aggiorna i link nel database
        });

        return res.status(200).json(work);
    } catch (error) {
        console.error('Failed to update work:', error);
        return res.status(400).json({ error: 'Failed to update work.' });
    }
};

// Elimina un'opera per ID
export const deleteWork = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        await prisma.work.delete({
            where: { id },
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting work:', error);
        return res.status(500).json({ error: 'Failed to delete work' });
    }
};
