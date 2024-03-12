import inquirer from 'inquirer'
import chalk from 'chalk'

inquirer
.prompt([
	{
		message: "Entre com o numero final da placa ",
		name: "placa"

	}
])
.then(function (answers){
	let placa = answers["placa"]
    switch(placa) {
		case "1":
		case "2":
			console.log(chalk.bgBlack("Não poderá circular Segunda-feira"))
			break
		case "3":
		case "4":
			console.log(chalk.bgBlack("Não poderá circular Terça-feira"))
			break
		case "5":
		case "6":
			console.log(chalk.bgBlack("Não poderá circular Quarta-feira"))
			break
		case "7":
		case "8":
			console.log(chalk.bgBlack("Não poderá circular Quinta-feira"))
			break
		case "9":
		case "0":
			console.log(chalk.bgBlack("Não poderá circular Sexta-feira"))
			break
		}})
		.catch((error) => {
			console.log(error)
		});
