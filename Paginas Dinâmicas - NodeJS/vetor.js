import http from "http";

http.createServer((req, res) => {
    const TAM = 10;
    const a = [];
    const b = [];
    const c = [];

    for (let i = 0; i < TAM; i++) {
        a[i] = i;
        b[i] = i; 
        c[i] = a[i] + b[i];
    }


    console.log("Vetor C:");
    console.log(c);


    const mensagem = c.join(" ");

    res.end(mensagem);
}).listen(5000, () => {
    console.log("Server rodando");
});
