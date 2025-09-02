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

export interface DailyForecast {
  date: string
  dayOfWeek: string
  temperatureC: number
  temperatureMin: number
  temperatureMax: number
  description: string
  icon: string
  humidity: number
  windSpeedKmh: number
  precipitation: number
  uvIndex: number
}

export interface WeeklyForecast {
  city: string
  countryCode?: string
  daily: DailyForecast[]
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

function mapToDailyForecast(data: any): DailyForecast {
  const date = new Date(data.dt * 1000)
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  
  return {
    date: date.toISOString().split('T')[0],
    dayOfWeek: dayNames[date.getDay()],
    temperatureC: Math.round(data.temp?.day || data.main?.temp || 0),
    temperatureMin: Math.round(data.temp?.min || data.main?.temp_min || 0),
    temperatureMax: Math.round(data.temp?.max || data.main?.temp_max || 0),
    description: data.weather?.[0]?.description || '',
    icon: data.weather?.[0]?.icon || '01d',
    humidity: data.humidity || data.main?.humidity || 0,
    windSpeedKmh: Math.round((data.wind_speed || data.wind?.speed || 0) * 3.6),
    precipitation: data.pop ? Math.round(data.pop * 100) : 0,
    uvIndex: data.uvi || 0,
  }
}

function mapToWeeklyForecast(data: any, city: string, countryCode?: string): WeeklyForecast {
  // Para o endpoint /forecast, agrupamos por dia e calculamos médias
  const dailyData = new Map<string, any[]>()
  
  if (data.list) {
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0]
      if (!dailyData.has(date)) {
        dailyData.set(date, [])
      }
      dailyData.get(date)!.push(item)
    })
  }

  const daily: DailyForecast[] = []
  
  dailyData.forEach((items, date) => {
    if (daily.length < 7) { // Limitar a 7 dias
      const avgTemp = items.reduce((sum, item) => sum + (item.main?.temp || 0), 0) / items.length
      const avgHumidity = items.reduce((sum, item) => sum + (item.main?.humidity || 0), 0) / items.length
      const avgWind = items.reduce((sum, item) => sum + (item.wind?.speed || 0), 0) / items.length
      
      // Encontrar o item com temperatura mais alta para o ícone e descrição
      const maxTempItem = items.reduce((max, item) => 
        (item.main?.temp || 0) > (max.main?.temp || 0) ? item : max
      )
      
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
      const dayOfWeek = dayNames[new Date(date).getDay()]
      
      daily.push({
        date,
        dayOfWeek,
        temperatureC: Math.round(avgTemp),
        temperatureMin: Math.round(Math.min(...items.map((item: any) => item.main?.temp || 0))),
        temperatureMax: Math.round(Math.max(...items.map((item: any) => item.main?.temp || 0))),
        description: maxTempItem.weather?.[0]?.description || '',
        icon: maxTempItem.weather?.[0]?.icon || '01d',
        humidity: Math.round(avgHumidity),
        windSpeedKmh: Math.round(avgWind * 3.6),
        precipitation: Math.round((items.reduce((sum, item) => sum + (item.pop || 0), 0) / items.length) * 100),
        uvIndex: 0, // Não disponível no endpoint /forecast
      })
    }
  })

  return {
    city,
    countryCode,
    daily: daily.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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

export async function getWeeklyForecastByCity(city: string, lang: string = 'pt_br'): Promise<WeeklyForecast> {
  const params = { q: city, appid: API_KEY, units: 'metric', lang, cnt: 56 } // 7 dias * 8 períodos de 3h
  const { data } = await http.get('/forecast', { params })
  return mapToWeeklyForecast(data, city, data.city?.country)
}

export async function getWeeklyForecastByCoords(
  latitude: number,
  longitude: number,
  lang: string = 'pt_br',
): Promise<WeeklyForecast> {
  const params = { lat: latitude, lon: longitude, appid: API_KEY, units: 'metric', lang, cnt: 56 }
  const { data } = await http.get('/forecast', { params })
  return mapToWeeklyForecast(data, data.city?.name || 'Localização', data.city?.country)
}


