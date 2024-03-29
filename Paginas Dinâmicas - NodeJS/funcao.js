import http from "http"

http.createServer((req, res) => {
    function verificar(a) {
        if (a % 2 == 0) {
            return "Par";
        } else {
            return "Impar";
        }
    }
            const num = 3; 
            const resposta = verificar(num);
            res.end("Impar")

        }).listen(5000, () => {
    console.log("Server rodando")
})