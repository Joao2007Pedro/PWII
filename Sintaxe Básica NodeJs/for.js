import inquirer from "inquirer";
import chalk from "chalk";

inquirer
    .prompt([
        {
            message: "Digite um número: ",
            name: "numero"
        }
    ])
    .then(function (answers) {
        let numero = (answers["numero"]);
            console.log(chalk.bgBlack("Imprimindo números de 1 até " + numero + ":"));
            for (let i = 1; i <= numero; i++) {
                console.log(i);
            }
        }
    )
    .catch((error) => {
        console.log(error);
    });
