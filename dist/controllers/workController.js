"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWork = exports.updateWork = exports.getWorkById = exports.getWorks = exports.createWork = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Crea una nuova opera senza immagini
const createWork = async (req, res) => {
    const { title, genre, authorId, links } = req.body; // Aggiungi i link nel corpo della richiesta
    try {
        const existingWork = await prisma.work.findFirst({ where: { title } });
        if (existingWork) {
            return res.status(409).json({ error: 'Work with this title already exists.' });
        }
        const work = await prisma.work.create({
            data: { title, genre, authorId, links } // Salva i link nel database
        });
        return res.status(201).json(work);
    }
    catch (error) {
        console.error('Failed to create work:', error);
        return res.status(400).json({ error: 'Failed to create work.' });
    }
};
exports.createWork = createWork;
// Recupera tutte le opere
const getWorks = async (req, res) => {
    try {
        const works = await prisma.work.findMany({
            where: {
                author: {
                    isNot: null, // Questo filtra i lavori senza autore
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
    }
    catch (error) {
        console.error('Error fetching works:', error);
        return res.status(500).json({ error: 'Failed to fetch works' });
    }
};
exports.getWorks = getWorks;
// Recupera una specifica opera per ID
const getWorkById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching work:', error);
        return res.status(500).json({ error: 'Failed to fetch work' });
    }
};
exports.getWorkById = getWorkById;
// Aggiorna un'opera per ID senza immagini
const updateWork = async (req, res) => {
    const { id } = req.params;
    const { title, genre, authorId, links } = req.body; // Aggiungi i link nell'input
    try {
        const work = await prisma.work.update({
            where: { id },
            data: { title, genre, authorId, links }, // Aggiorna i link nel database
        });
        return res.status(200).json(work);
    }
    catch (error) {
        console.error('Failed to update work:', error);
        return res.status(400).json({ error: 'Failed to update work.' });
    }
};
exports.updateWork = updateWork;
// Elimina un'opera per ID
const deleteWork = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.work.delete({
            where: { id },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting work:', error);
        return res.status(500).json({ error: 'Failed to delete work' });
    }
};
exports.deleteWork = deleteWork;
