import http from "http"

http.createServer((req , res) => {
    const nome = "Joao Carlos"
    console.log(nome)
    res.end(nome)
}) .listen(5000, () => {
    console.log("Server rodando")
})
