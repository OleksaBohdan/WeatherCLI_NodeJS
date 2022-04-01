#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import {
  saveKeyValue,
  getKeyValue,
  TOKEN_DICTIONARY,
} from './services/storage.service.js'
import { getWeather } from './services/api.service.js'
import chalk from 'chalk'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Token did not exist.')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Token saved')
  } catch (err) {
    printError('Error saving token', err.message)
  }
}

const saveCity = async (city) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('City saved')
  } catch (err) {
    printError('City did not save', err.message)
  }
}

const getForecast = async () => {
  try {
    const cityName = await getKeyValue(TOKEN_DICTIONARY.city)
    const weather = await getWeather(cityName)
    console.log(
      chalk.bgBlueBright(` Прогноз Погоды от Бодуна!\n\n`),
      `В городе ${weather.name} ${
        weather.weather[0].description
      }\n Температура воздуха сейчас: ${Math.round(
        weather.main.temp
      )}\n Ощущается как ${Math.round(weather.main.feels_like)}\n\n`,
      chalk.bgBlueBright(`Хорошего дня!\n`)
    )
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Неверно указан город.')
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен.')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    return printHelp()
  }

  if (args.s) {
    return saveCity(args.s)
  }

  if (args.t) {
    return saveToken(args.t)
  }

  return getForecast()
}

initCLI()
