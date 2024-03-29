import http from "http"

http.createServer((req, res) => {
    const letra = "t";
    let mensagem;
    if(letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u') {
        mensagem = ("A letra e vogal") 
    } else 
    mensagem = ("A letra e consoante")


    const resposta = mensagem;
    res.end(resposta)
}) .listen(5000,  () => {
    console.log("Server rodando")
})
