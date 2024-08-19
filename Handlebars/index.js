const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Dados de exemplo
const noticias = [
    { id: 1, titulo: 'Gabaritos', resumo: 'Resumo da notícia 1', imagem: '/imagens/news-825x525.jpg' },
    { id: 2, titulo: 'Rôbos', resumo: 'Resumo da notícia 2', imagem: '/imagens/robo.jpg' },
    { id: 3, titulo: 'Unicórnio', resumo: 'Resumo da notícia 1', imagem: '/imagens/uni.jpg' },
    { id: 4, titulo: 'Civilização Antiga', resumo: 'Resumo da notícia 2', imagem: '/imagens/civi.jpg' },
    { id: 5, titulo: 'SkySurfing', resumo: 'Resumo da notícia 2', imagem: '/imagens/sky.jpg' },
];

// Rota para a página principal
app.get('/', (req, res) => {
    res.render('index', { noticias });
});

// Rota para a página de notícia individual
app.get('/noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const noticia = noticias.find(n => n.id === noticiaId);
    if (!noticia) return res.status(404).send('Notícia não encontrada.');

    res.render('noticia', {
        titulo: noticia.titulo,
        imagem: noticia.imagem,
        conteudo: 'Conteúdo da notícia...', // Pode ser substituído por conteúdo dinâmico
        noticiasRelacionadas: noticias.filter(n => n.id !== noticiaId)
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
