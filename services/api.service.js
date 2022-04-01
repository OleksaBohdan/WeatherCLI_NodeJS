import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
import axios from 'axios'

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token)
  if (!token) {
    throw new Error(
      'Не задан ключ API. \nЗадайте его через команду -t [API_KEY]}'
    )
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    }
  )

  // console.log(data)
  return data
}

export { getWeather }
