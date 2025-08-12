import axios from 'axios'

export interface CurrentWeather {
  city: string
  countryCode?: string
  temperatureC: number
  description: string
  icon: string
  humidity: number
  windSpeedKmh: number
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

if (!API_KEY) {
  // Intentionally throw during runtime so the developer notices missing env var
  // eslint-disable-next-line no-throw-literal
  throw new Error('VITE_OPENWEATHER_API_KEY não foi definido. Configure no arquivo .env')
}

const http = axios.create({ baseURL: BASE_URL, timeout: 10000 })

function mapToCurrentWeather(data: any): CurrentWeather {
  const temperatureC = typeof data?.main?.temp === 'number' ? data.main.temp : NaN
  const humidity = typeof data?.main?.humidity === 'number' ? data.main.humidity : NaN
  const windSpeedMs = typeof data?.wind?.speed === 'number' ? data.wind.speed : NaN
  const windSpeedKmh = Number.isFinite(windSpeedMs) ? Math.round(windSpeedMs * 3.6) : NaN
  const weather0 = Array.isArray(data?.weather) ? data.weather[0] : undefined

  return {
    city: data?.name ?? '',
    countryCode: data?.sys?.country,
    temperatureC,
    description: weather0?.description ?? '',
    icon: weather0?.icon ?? '01d',
    humidity,
    windSpeedKmh,
  }
}

export async function getWeatherByCity(city: string, lang: string = 'pt_br'): Promise<CurrentWeather> {
  const params = { q: city, appid: API_KEY, units: 'metric', lang }
  const { data } = await http.get('/weather', { params })
  return mapToCurrentWeather(data)
}

export async function getWeatherByCoords(
  latitude: number,
  longitude: number,
  lang: string = 'pt_br',
): Promise<CurrentWeather> {
  const params = { lat: latitude, lon: longitude, appid: API_KEY, units: 'metric', lang }
  const { data } = await http.get('/weather', { params })
  return mapToCurrentWeather(data)
}


