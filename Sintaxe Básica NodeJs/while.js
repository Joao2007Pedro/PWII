import inquirer from "inquirer";
import chalk from "chalk";

function solicitarNumero() {
    inquirer
    .prompt([
        {
            message: "Digite um número maior que 10: ",
            name: "numero"
        }
    ])
    .then(function (answers) {
        let numero = parseInt(answers["numero"]);
        while (numero <= 10) {
            console.log(chalk.bgRed("O número deve ser maior que 10."));
            return solicitarNumero();
        }
        console.log(chalk.bgBlue("Número válido: " + numero));
    })
    .catch((error) => {
        console.log(error);
    });
}

solicitarNumero();
