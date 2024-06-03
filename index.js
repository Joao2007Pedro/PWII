import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Rotas estáticas para os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/noticia1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'noticia1.html'));
});

app.get('/noticia2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'noticia2.html'));
});

app.get('/noticia3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'noticia3.html'));
});

app.get('/noticia4.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'noticia4.html'));
});

app.get('/noticia5.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'noticia5.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});
