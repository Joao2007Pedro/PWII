import http from "http";

http.createServer((req, res) => {
    let numero = 11;
    let mensagem;

    while (numero <= 10) {
        mensagem = "O numero deve ser maior que 10";
        break; 
    }

    if (numero > 10) {
        mensagem = "Numero valido: ";
    }

 
    const resposta = `Numero - ${numero} ${mensagem}`;
    res.end(resposta);
}).listen(5000, () => {
    console.log("Server rodando");
});
