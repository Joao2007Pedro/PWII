import inquirer from "inquirer";
import chalk from "chalk";

const TAM = 10;
let a = [];
let b = [];
let c = [];

const prompts = [];

for (let i = 0; i < TAM; i++) {
    prompts.push({
        message: `Digite o ${i + 1}° valor do vetor A: `,
        name: `a${i}`
    });
    prompts.push({
        message: `Digite o ${i + 1}° valor do vetor B: `,
        name: `b${i}`
    });
}

inquirer
    .prompt(prompts)
    .then(function (answers) {
        for (let i = 0; i < TAM; i++) {
            a[i] = parseInt(answers[`a${i}`]);
            b[i] = parseInt(answers[`b${i}`]);
            c[i] = a[i] + b[i];
        }

        console.log("\nC = ");
        for (let i = 0; i < TAM; i++) {
            console.log(chalk.bgGray(`${c[i]} `));
        }
    })
    .catch((error) => {
        console.log(error);
    });
