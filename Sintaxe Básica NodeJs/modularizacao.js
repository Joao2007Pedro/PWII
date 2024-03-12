import celsius from "./temperatura.js";
import inquirer from "inquirer";
import chalk from "chalk";

inquirer
.prompt ([
    {
        message: "Qual é a temperatura em graus Celsius que queira saber em Fahreit?",
        name: "temp"
    }
])

.then (function (answers) {
    let temp = parseInt(answers["temp"]); 
    let res = celsius(temp);
    console.log(chalk.bgBlack(res));
})
.catch((error) => {
    console.log(error);
});