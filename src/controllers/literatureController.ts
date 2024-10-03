import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Crea una nuova relazione letteraria senza immagini
export const createLiterature = async (req: Request, res: Response) => {
    try {
        const { authorId, workId } = req.body;

        // Verifica se esiste già la relazione letteraria per evitare duplicati
        const existingLiterature = await prisma.literature.findFirst({
            where: { authorId, workId },
        });

        if (existingLiterature) {
            return res.status(409).json({ error: 'This literature entry already exists' });
        }

        const literature = await prisma.literature.create({
            data: {
                authorId,
                workId,
            },
        });

        res.status(201).json(literature);
    } catch (error) {
        console.error('Error creating literature:', error);
        res.status(400).json({ error: 'Failed to create literature' });
    }
};

// Recupera tutte le relazioni letterarie
export const getLiteratures = async (_req: Request, res: Response) => {
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

        res.status(200).json(literatures);
    } catch (error) {
        console.error('Error fetching literatures:', error);
        res.status(500).json({ error: 'Failed to fetch literatures' });
    }
};

// Recupera una singola relazione letteraria per ID
export const getLiteratureById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const literature = await prisma.literature.findUnique({
            where: { id },
            include: {
                author: true,
                work: true,
            },
        });

        if (!literature) {
            return res.status(404).json({ error: 'Literature not found' });
        }

        res.status(200).json(literature);
    } catch (error) {
        console.error('Error fetching literature:', error);
        res.status(500).json({ error: 'Failed to fetch literature' });
    }
};

// Aggiorna una relazione letteraria per ID senza immagini
export const updateLiterature = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { authorId, workId } = req.body;

    try {
        const literature = await prisma.literature.update({
            where: { id },
            data: {
                authorId,
                workId,
            },
        });

        res.status(200).json(literature);
    } catch (error) {
        console.error('Error updating literature:', error);
        res.status(400).json({ error: 'Failed to update literature' });
    }
};

// Elimina una relazione letteraria per ID
export const deleteLiterature = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.literature.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting literature:', error);
        res.status(500).json({ error: 'Failed to delete literature' });
    }
};
