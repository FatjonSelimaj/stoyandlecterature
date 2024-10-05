"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workController_1 = require("../controllers/workController");
const router = (0, express_1.Router)();
// Rotta per creare una nuova opera senza immagini
router.post('/works', workController_1.createWork);
// Rotta per ottenere tutte le opere
router.get('/works', workController_1.getWorks);
// Rotta per ottenere un'opera specifica per ID
router.get('/works/:id', workController_1.getWorkById);
// Rotta per aggiornare un'opera specifica per ID senza immagini
router.put('/works/:id', workController_1.updateWork);
// Rotta per eliminare un'opera specifica per ID
router.delete('/works/:id', workController_1.deleteWork);
exports.default = router;
