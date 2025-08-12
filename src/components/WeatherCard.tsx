import './WeatherCard.css'
import type { CurrentWeather } from '../services/weatherApi'

interface WeatherCardProps {
  weather: CurrentWeather | null
  loading: boolean
  error: string | null
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="card weather-card">
        <p>Carregando dados do clima...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card weather-card error">
        <p>{error}</p>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="card weather-card">
        <p>Busque uma cidade ou use a sua localização para ver o clima.</p>
      </div>
    )
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`
  const title = weather.description

  return (
    <div className="card weather-card shadow border-0 rounded-4 bg-gradient-to-br from-brand-700 to-cyan-400">
      <div className="header flex-wrap gap-2">
        <div className="place">
          <h2>
            {weather.city} {weather.countryCode ? `· ${weather.countryCode}` : ''}
          </h2>
          <p className="desc">{title}</p>
        </div>
        <img className="icon" src={iconUrl} alt={weather.description} />
      </div>

      <div className="stats">
        <div className="stat">
          <span className="label">Temperatura</span>
          <span className="value">{Math.round(weather.temperatureC)}°C</span>
        </div>
        <div className="stat">
          <span className="label">Umidade</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="stat">
          <span className="label">Vento</span>
          <span className="value">{weather.windSpeedKmh} km/h</span>
        </div>
      </div>
    </div>
  )
}


