"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controllers/articleController");
const router = (0, express_1.Router)();
// Rotta per creare un nuovo articolo
router.post('/articles', articleController_1.createArticle);
// Rotta per ottenere tutti gli articoli
router.get('/articles', articleController_1.getArticles);
// Rotta per ottenere articoli per categoria
router.get('/articles/category/:category', articleController_1.getArticlesByCategory);
// Rotta per ottenere un articolo per ID (corretto)
router.get('/articles/:id', articleController_1.getArticleById);
// Rotta per aggiornare un articolo per ID
router.put('/articles/:id', articleController_1.updateArticle);
// Rotta per eliminare un articolo per ID
router.delete('/articles/:id', articleController_1.deleteArticle);
exports.default = router;
