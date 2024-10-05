"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const workRoutes_1 = __importDefault(require("./routes/workRoutes"));
const literatureRoutes_1 = __importDefault(require("./routes/literatureRoutes"));
const historySectionRoutes_1 = __importDefault(require("./routes/historySectionRoutes"));
const app = (0, express_1.default)();
// Abilita CORS per tutte le richieste
app.use((0, cors_1.default)());
// Middleware per gestire le richieste JSON
app.use(express_1.default.json());
// Aggiungi una rotta di base per verificare che il server funzioni
app.get('/', (req, res) => {
    res.send('Benvenuto al backend di Storia e Letteratura!');
});
// Usa le rotte degli articoli
app.use('/api', articleRoutes_1.default);
// Usa le rotte degli autori
app.use('/api', authorRoutes_1.default);
// Usa le rotte delle opere
app.use('/api', workRoutes_1.default);
// Usa le rotte delle relazioni letterarie
app.use('/api', literatureRoutes_1.default);
// Usa le rotte delle sezioni storiche
app.use('/api', historySectionRoutes_1.default);
// Gestisci le rotte non trovate (404)
app.use((req, res) => {
    res.status(404).send('Errore 404: Risorsa non trovata');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
