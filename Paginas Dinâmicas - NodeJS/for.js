import http from "http";

http.createServer((req, res) => {
    const numero = 10;
    let mensagem = "Imprimindo numeros de 1 ate " + numero + ":\n";
    
    for (let i = 1; i <= numero; i++) {
        mensagem += i + "\n";
    }

    const resposta = mensagem;
    res.end(resposta);
}).listen(5000, () => {
    console.log("Servidor rodando");
});

    
