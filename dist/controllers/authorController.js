"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.getAuthorById = exports.getAuthors = exports.createAuthor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Creare un autore senza immagini
const createAuthor = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error creating author:', error);
        res.status(400).json({ error: 'Failed to create author' });
    }
};
exports.createAuthor = createAuthor;
// Recuperare tutti gli autori
const getAuthors = async (req, res) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                works: true, // Include i lavori dell'autore
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.status(200).json(authors);
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
};
exports.getAuthors = getAuthors;
// Recuperare un singolo autore per ID
const getAuthorById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ error: 'Failed to fetch author' });
    }
};
exports.getAuthorById = getAuthorById;
// Aggiornare un autore senza immagini
const updateAuthor = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error updating author:', error);
        return res.status(500).json({ error: 'Failed to update author' });
    }
};
exports.updateAuthor = updateAuthor;
// Eliminare un autore
const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.author.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Failed to delete author' });
    }
};
exports.deleteAuthor = deleteAuthor;
