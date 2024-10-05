"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorController_1 = require("../controllers/authorController");
const router = (0, express_1.Router)();
// Rotta per creare un nuovo autore
router.post('/authors', authorController_1.createAuthor);
// Rotta per ottenere tutti gli autori
router.get('/authors', authorController_1.getAuthors);
// Rotta per ottenere un autore per ID
router.get('/authors/:id', authorController_1.getAuthorById);
// Rotta per aggiornare un autore per ID
router.put('/authors/:id', authorController_1.updateAuthor);
// Rotta per eliminare un autore per ID
router.delete('/authors/:id', authorController_1.deleteAuthor);
exports.default = router;
