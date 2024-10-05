"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const literatureController_1 = require("../controllers/literatureController");
const router = (0, express_1.Router)();
// Rotta per creare una nuova relazione letteraria senza immagini
router.post('/literatures', literatureController_1.createLiterature);
// Rotta per ottenere tutte le relazioni letterarie
router.get('/literatures', literatureController_1.getLiteratures);
// Rotta per ottenere una relazione letteraria per ID
router.get('/literatures/:id', literatureController_1.getLiteratureById);
// Rotta per aggiornare una relazione letteraria per ID senza immagini
router.put('/literatures/:id', literatureController_1.updateLiterature);
// Rotta per eliminare una relazione letteraria per ID
router.delete('/literatures/:id', literatureController_1.deleteLiterature);
exports.default = router;
