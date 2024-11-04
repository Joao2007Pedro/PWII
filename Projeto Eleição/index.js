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

// Adicionar css
app.use('/css', express.static('./css'))

// Referenciar a pasta de imagens
app.use('/imagens', express.static('./imagens'));

// Configuração do express-handlebars
app.engine('handlebars', engine());
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
app.get('/', function(req, res){
    // SQL
    let sql = 'SELECT * FROM candidatos';

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        res.render('formulario', {candidatos:retorno});
    });
});

// Rota de Cadastro 
app.post('/cadastrar', function(req, res) {
    // Obter os dados que serão utilizados para o cadastro
    let nome = req.body.nome;
    let numero = req.body.numero;
    let imagem = req.files.imagem.name;

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
    res.redirect('/');
});

// Rota para remover produtos
app.get('/remover/:idCandidato&:imagem', function(req, res){
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
    res.redirect('/');
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
app.post('./editar', function(req, res){
    
})

//Servidor 
app.listen(8080);
