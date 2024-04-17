const http = require("http")
const fs = require("fs")
const url = require("url")

const port = 3000

const server = http.createServer((req, res)=>{
    
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name
    const email = urlInfo.query.email;
    const telefone = urlInfo.query.telefone;
    const sobrenome = urlInfo.query.sobrenome;
    const pais = urlInfo.query.pais;
    const estado = urlInfo.query.estado;
    const cidade = urlInfo.query.cidade;
    const genero = urlInfo.query.genero;

    if(!name){
        fs.readFile('index.html', (err, data)=> {
            res.writeHead(200, {"Contenty-Type":"text/html"})
            res.write(data)
            return res.end()
        })
    } else {
        const nameNewLine = name + "\r\n"
        fs.appendFile("arquivo.txt", nameNewLine, (err, data)=>{
            res.writeHead(302, {
                location: "/",
            })
            res.end()
        })
    }
    
    if (sobrenome) {
        const sobrenomeNewLine = sobrenome + "\r\n";
        fs.appendFile("arquivo.txt", sobrenomeNewLine, (err) => {
        });
    }

    if (genero) {
        const generoNewLine = "Gênero: " + genero + "\r\n";
        fs.appendFile("arquivo.txt", generoNewLine, (err) => {
        });
    }

    if (telefone) {
        const telefoneNewLine = telefone + "\r\n";
        fs.appendFile("arquivo.txt", telefoneNewLine, (err) => {
        });
    }

    if (email) {
        const emailNewLine = email + "\r\n";
        fs.appendFile("arquivo.txt", emailNewLine, (err) => {
        });
    }
    
    if (pais) {
        const paisNewLine = pais + "\r\n";
        fs.appendFile("arquivo.txt", paisNewLine, (err) => {
        });
    }

    if (estado) {
        const estadoNewLine = estado + "\r\n";
        fs.appendFile("arquivo.txt", estadoNewLine, (err) => {
        });
    }

    if (cidade) {
        const cidadeNewLine = cidade + "\r\n";
        fs.appendFile("arquivo.txt", cidadeNewLine, (err) => {
        });
    }
})

server.listen(port, ()=> {
    console.log(`Servidor rodando na porta: ${3000}`)
})
