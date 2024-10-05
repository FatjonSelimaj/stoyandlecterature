"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistorySection = exports.updateHistorySection = exports.getHistorySectionById = exports.getHistorySections = exports.createHistorySection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Crea una nuova sezione storica con titolo, descrizione e periodo storico
const createHistorySection = async (req, res) => {
    try {
        const { title, description, historicalPeriod } = req.body;
        // Verifica che tutti i campi richiesti siano presenti
        if (!title || !description || !historicalPeriod) {
            return res.status(400).json({ error: 'All fields are required: title, description, and historicalPeriod' });
        }
        // Crea la nuova sezione storica
        const historySection = await prisma.historySection.create({
            data: {
                title,
                description,
                historicalPeriod,
                createdAt: new Date(), // Facoltativo: Prisma imposta automaticamente la data di creazione
            },
        });
        res.status(201).json(historySection);
    }
    catch (error) {
        console.error('Error creating history section:', error);
        res.status(500).json({ error: 'Failed to create history section' });
    }
};
exports.createHistorySection = createHistorySection;
// Ottieni tutte le sezioni storiche
const getHistorySections = async (_req, res) => {
    try {
        const historySections = await prisma.historySection.findMany({
            orderBy: {
                createdAt: 'desc', // Ordina per data di creazione
            },
        });
        res.status(200).json(historySections);
    }
    catch (error) {
        console.error('Error fetching history sections:', error);
        res.status(500).json({ error: 'Failed to fetch history sections' });
    }
};
exports.getHistorySections = getHistorySections;
// Ottieni una sezione storica per ID
const getHistorySectionById = async (req, res) => {
    const { id } = req.params;
    try {
        const historySection = await prisma.historySection.findUnique({
            where: { id },
        });
        if (!historySection) {
            return res.status(404).json({ error: 'History section not found' });
        }
        res.status(200).json(historySection);
    }
    catch (error) {
        console.error('Error fetching history section by ID:', error);
        res.status(500).json({ error: 'Failed to fetch history section' });
    }
};
exports.getHistorySectionById = getHistorySectionById;
// Aggiorna una sezione storica per ID
const updateHistorySection = async (req, res) => {
    const { id } = req.params;
    const { title, description, historicalPeriod } = req.body;
    try {
        // Verifica che tutti i campi richiesti siano presenti
        if (!title || !description || !historicalPeriod) {
            return res.status(400).json({ error: 'All fields are required: title, description, and historicalPeriod' });
        }
        const historySection = await prisma.historySection.update({
            where: { id },
            data: {
                title,
                description,
                historicalPeriod,
            },
        });
        res.status(200).json(historySection);
    }
    catch (error) {
        console.error('Error updating history section:', error);
        res.status(500).json({ error: 'Failed to update history section' });
    }
};
exports.updateHistorySection = updateHistorySection;
// Elimina una sezione storica per ID
const deleteHistorySection = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.historySection.delete({
            where: { id },
        });
        res.status(204).send(); // Restituisce 204 (No Content) per successo
    }
    catch (error) {
        console.error('Error deleting history section:', error);
        res.status(500).json({ error: 'Failed to delete history section' });
    }
};
exports.deleteHistorySection = deleteHistorySection;
