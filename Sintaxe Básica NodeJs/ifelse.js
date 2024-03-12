import inquirer from "inquirer"
import chalk from "chalk";

inquirer
.prompt([
    {
        message: "Digite a letra ", 
        name: "letra"
    }
  ])
  .then(function (answers){
    let letra = answers["letra"]
    if (letra=='a' || letra=='e' || letra=='i' || letra=='o' || letra=='u') {
         console.log(chalk.bgBlue("A letra é vogal"))
       }else 
    console.log(chalk.bgBlue("A letra é consoante"))
  })
  .catch((error) => {
    console.log(error)
  });