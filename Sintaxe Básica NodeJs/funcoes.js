import chalk from "chalk";
import inquirer from "inquirer";

function verificar(a) {
    if (a % 2 == 0) {
        return "Par";
    } else {
        return "Ímpar";
    }
}

inquirer
    .prompt([
        {
            message: "Digite o número: ",
            name: "num"
        }
    ])
    .then(function (answers) {
        let num = parseInt(answers["num"]); 
        let res = verificar(num);
        console.log(chalk.bgBlack(res));
    })
    .catch((error) => {
        console.log(error);
    });
