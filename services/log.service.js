import chalk from 'chalk'

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + error)
}
const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + message)
}
const printHelp = () => {
  console.log(
    chalk.bgBlueBright(' HELP \n') +
    'Без параметров - вывод погоды \n' +
    '-s [CITY] для установки города \n' +
    'h для вывода помощи \n' +
    't [API_KEY] для сохраниения токена \n' +
    chalk.bgBlueBright(' END ')
  )
}

export { printError, printSuccess, printHelp }
