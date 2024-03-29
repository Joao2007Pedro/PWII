import http from "http";
import celsius from "./temperatura.js";

http.createServer((req, res) => {
    let tempCel = 30;
    let tempFah = celsius(tempCel);

    const resposta = `A temperatura ${tempCel} graus Celsius eh equivalente a ${tempFah} graus em Fahreit`;

    res.end(resposta);
}).listen(5000, () => {
    console.log("Server rodando");
});

    
