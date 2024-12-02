// Importar módulo Express
const express = require('express');

// Importar módulo fileupload
const fileupload = require('express-fileupload')

// Importar módulo express-handlebars 
const { engine } = require('express-handlebars');

// Importar módulo Mysql
const mysql = require('mysql2');

// File Systems
const fs = require('fs')

// App 
const app = express();

// Habilitando o upload de arquivos
app.use(fileupload());

// Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'))


// Referenciar a pasta de imagens
app.use('/imagens', express.static('./imagens'));

// Configuração do express-handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main', // Definindo o layout principal
    helpers: {
        condicionalIgualdade: function (parametro1, parametro2, options) {
            return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuração de conexão 
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Natalicia79',
    database:'projeto'
});

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Teste de conexão 
conexao.connect(function(erro) {
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso');
});

// Rota principal
app.get('/index', function(req, res){
    // SQL
    let sql = 'SELECT * FROM candidatos';

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        res.render('index', {candidatos:retorno});
    });
});

// Rota de Votação
app.get('/voto', function (req, res) {
    let sql = 'SELECT * FROM candidatos';

    conexao.query(sql, function (erro, candidatos) {
        if (erro) {
            console.error('Erro ao buscar candidatos:', erro);
            res.status(500).send('Erro ao carregar a página de votação.');
            return;
        }
        // Enviar dados para o template
        res.render('voto', { candidatos: candidatos });
    });
});

app.get('/votar/:idCandidato', function (req, res) {
    const idCandidato = req.params.idCandidato;

    // SQL para atualizar o número de votos
    let sql = `UPDATE candidatos SET votos = votos + 1 WHERE idCandidato = ${idCandidato}`;

    conexao.query(sql, function (erro, retorno) {
        if (erro) {
            console.error('Erro ao registrar o voto:', erro);
            res.status(500).send('Erro ao registrar o voto.');
            return;
        }

        // Redirecionar para uma página de sucesso
        res.redirect('/votoRegistrado');
    });
});

// Página de sucesso
app.get('/votoRegistrado', function (req, res) {
    res.render('votoRegistrado');
});

app.get('/resultado', function (req, res) {
    // SQL para buscar candidatos e votos
    let sql = 'SELECT nome, votos FROM candidatos ORDER BY votos DESC';

    conexao.query(sql, function (erro, candidatos) {
        if (erro) {
            console.error('Erro ao carregar resultados:', erro);
            res.status(500).send('Erro ao carregar resultados.');
            return;
        }

        // Renderizar a página com os resultados
        res.render('resultado', { candidatos: candidatos });
    });
});


// Rota principal contendo a situação
app.get('/:situacao', function(req, res){
    // SQL
    let sql = 'SELECT * FROM candidatos';

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        res.render('formulario', {candidatos:retorno, situacao:req.params.situacao});
    });
});

// Rota de Cadastro 
app.post('/cadastrar', function(req, res) {
    try {
        // Obter os dados que serão utilizados para o cadastro
        let nome = req.body.nome;
        let numero = req.body.numero;
        let imagem = req.files.imagem.name;

        // Validar o nome do candidato e numero
        if (nome == ''|| numero == '' || isNaN(numero)) {
            res.redirect('/falhaCadastro');
        }else {
            //SQL
            let sql = `INSERT INTO candidatos (nome, numero, imagem) VALUES ('${nome}', ${numero}, '${imagem}')`;

            // Executar comando SQL
            conexao.query(sql, function(erro, retorno){
                // Caso ocorra algum erro
                if (erro) throw erro;

                // Caso ocorra o cadastro
                req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name); 
                console.log(retorno);
            });

            // Retornar para a rota principal
            res.redirect('/okCadastro');
        }
    }catch(erro){
        res.redirect('/falhaCadastro');
    }
});

// Rota para remover produtos
app.get('/remover/:idCandidato&:imagem', function(req, res){
    
    // Tratamento de exceção 
    try {
        //SQL
        let sql = `DELETE FROM candidatos WHERE idCandidato = ${req.params.idCandidato}`;

        // Executar o comando SQL
        conexao.query(sql, function(erro, retorno){
            // Caso falhe o comando SQL
            if(erro) throw erro;

            //Caso o comando SQL funcione
            fs.unlink(__dirname+'/imagem/'+req.params.imagem, (erro_imagem)=>{
                console.log('Falha ao remover a imagem');
            });
        });

        // Redirecionamento
        res.redirect('/okRemover');
    }catch(erro){
        res.redirect('/falhaRemover');
    }

});

// Rota para redirecionar para o formulario de alteração/edição
app.get('/formularioEditar/:idCandidato', function(req, res){
    
    // SQL
    let sql = `SELECT * FROM candidatos WHERE idCandidato = ${req.params.idCandidato}`;

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        //Caso haja falha no comando SQL
        if(erro) throw erro;

        // Caso consiga executar o comando SQL 
        res.render('formularioEditar', {candidatos:retorno[0]});
    });
});

// Rota para editar Candidatos
    app.post('/editar', function(req, res){
    

    // Obter os dados do formulario 
    let nome = req.body.nome;
    let numero = req.body.numero;
    let idCandidato = req.body.idCandidato;
    let nomeImagem = req.body.nomeImagem;

    // Validar nome do candidato e numero
    if (nome == '' || numero == '' || isNaN(numero)) {
        res.redirect('/falhaEdicao');
    } else {

        // Definir o tipo de edição
        try{
            // Objeto de imagem
            let imagem = req.files.imagem;

            // SQL
            let sql = `UPDATE candidatos SET nome='${nome}', numero=${numero}, imagem='${imagem.name}' WHERE idCandidato=${idCandidato}`;

            // Executar comando SQL
            conexao.query(sql, function(erro, retorno){
                // Caso falhe o comando SQL
                if(erro) throw erro;

                // Remover imagem antiga
                fs.unlink(__dirname+'/imagens/'+nomeImagem, (erro_imagem)=>{
                console.log('Falha ao remover a imagem.');
            });

                // Cadastrar nova imagem
                imagem.mv(__dirname+'/imagens/'+imagem.name);
        });
    }catch(erro){
        
        // SQL
        let sql = `UPDATE candidatos SET nome='${nome}', numero=${numero} WHERE idCandidato=${idCandidato}`;

        // Executar comando SQL
        conexao.query(sql, function(erro, retorno){
            // Caso falhe o comando SQL
            if(erro) throw erro;
        });
    }


        // Redirecionamento
        res.redirect('/okEdicao')
    }
});

//Servidor 
app.listen(3030);
