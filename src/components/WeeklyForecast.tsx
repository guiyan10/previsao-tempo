import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, 
  WiFog, WiDust, WiTornado, WiHumidity, WiStrongWind,
  WiThermometer, WiBarometer, WiHorizon, WiHorizonAlt,
  WiMoonWaxingCrescent3, WiMoonWaxingGibbous3, WiMoonFull,
  WiMoonWaningGibbous3, WiMoonWaningCrescent3
} from 'react-icons/wi'
import { 
  FaCalendarAlt, FaThermometerHalf, FaTint, FaWind, 
  FaCloudRain, FaSun, FaCloud, FaSnowflake, FaBolt,
  FaEye, FaEyeSlash, FaChevronDown, FaChevronUp
} from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'
import type { WeeklyForecast as WeeklyForecastType } from '../services/weatherApi'
import './WeeklyForecast.css'

interface WeeklyForecastProps {
  forecast: WeeklyForecastType | null
  loading: boolean
}

export default function WeeklyForecast({ forecast, loading }: WeeklyForecastProps) {
  const { isDark, colorScheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  function getColorScheme() {
    const colorSchemes = {
      blue: { primary: '#3B82F6', secondary: '#60A5FA', accent: '#1E40AF' },
      purple: { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#5B21B6' },
      green: { primary: '#10B981', secondary: '#34D399', accent: '#047857' },
      orange: { primary: '#F59E0B', secondary: '#FBBF24', accent: '#D97706' },
      pink: { primary: '#EC4899', secondary: '#F472B6', accent: '#BE185D' },
    }
    return colorSchemes[colorScheme]
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="weekly-forecast loading"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`
        }}
      >
        <div className="loading-content">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="loading-spinner"
            style={{ borderColor: getColorScheme().primary }}
          />
          <p className="loading-text">Carregando previsão semanal...</p>
        </div>
      </motion.div>
    )
  }

  if (!forecast) {
    return null
  }

  const colors = getColorScheme()

  const getWeatherIcon = (iconCode: string, description: string) => {
    // Mapeamento baseado no código do ícone da OpenWeather
    const iconMap: { [key: string]: React.ReactNode } = {
      '01d': <WiDaySunny className="weather-icon-svg" />,
      '01n': <WiMoonFull className="weather-icon-svg" />,
      '02d': <WiCloudy className="weather-icon-svg" />,
      '02n': <WiCloudy className="weather-icon-svg" />,
      '03d': <WiCloudy className="weather-icon-svg" />,
      '03n': <WiCloudy className="weather-icon-svg" />,
      '04d': <WiCloudy className="weather-icon-svg" />,
      '04n': <WiCloudy className="weather-icon-svg" />,
      '09d': <WiRain className="weather-icon-svg" />,
      '09n': <WiRain className="weather-icon-svg" />,
      '10d': <WiRain className="weather-icon-svg" />,
      '10n': <WiRain className="weather-icon-svg" />,
      '11d': <WiThunderstorm className="weather-icon-svg" />,
      '11n': <WiThunderstorm className="weather-icon-svg" />,
      '13d': <WiSnow className="weather-icon-svg" />,
      '13n': <WiSnow className="weather-icon-svg" />,
      '50d': <WiFog className="weather-icon-svg" />,
      '50n': <WiFog className="weather-icon-svg" />,
    }

    // Fallback baseado na descrição
    if (iconMap[iconCode]) {
      return iconMap[iconCode]
    }

    if (description.toLowerCase().includes('chuva') || description.toLowerCase().includes('rain')) {
      return <WiRain className="weather-icon-svg" />
    }
    if (description.toLowerCase().includes('nublado') || description.toLowerCase().includes('cloud')) {
      return <WiCloudy className="weather-icon-svg" />
    }
    if (description.toLowerCase().includes('neve') || description.toLowerCase().includes('snow')) {
      return <WiSnow className="weather-icon-svg" />
    }
    if (description.toLowerCase().includes('tempestade') || description.toLowerCase().includes('thunder')) {
      return <WiThunderstorm className="weather-icon-svg" />
    }
    if (description.toLowerCase().includes('névoa') || description.toLowerCase().includes('fog')) {
      return <WiFog className="weather-icon-svg" />
    }

    return <WiDaySunny className="weather-icon-svg" />
  }

  const getWeatherMood = (temp: number) => {
    if (temp >= 25) return '😎'
    if (temp >= 20) return '😊'
    if (temp >= 15) return '😌'
    if (temp >= 10) return '🧥'
    return '❄️'
  }

  const getPrecipitationIcon = (precipitation: number) => {
    if (precipitation > 70) return <FaCloudRain className="w-3 h-3" />
    if (precipitation > 30) return <FaTint className="w-3 h-3" />
    return <FaSun className="w-3 h-3" />
  }

  const getPrecipitationColor = (precipitation: number) => {
    if (precipitation > 70) return '#3B82F6'
    if (precipitation > 30) return '#60A5FA'
    return '#F59E0B'
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="weekly-forecast"
      style={{
        background: `linear-gradient(135deg, 
          ${isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'} 0%, 
          ${isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(249, 250, 251, 0.8)'} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`,
        boxShadow: `0 25px 50px -12px ${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`
      }}
    >
      {/* Header com botão de toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="forecast-header"
      >
        <div className="header-content">
          <div className="header-left">
            <FaCalendarAlt className="w-6 h-6" style={{ color: colors.primary }} />
            <div className="header-text">
              <h3 className="forecast-title">Previsão para 7 Dias</h3>
              <span className="forecast-subtitle">{forecast.city}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleExpanded}
            className="toggle-forecast-btn"
            style={{ 
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            {isExpanded ? (
              <>
                <FaEyeSlash className="w-4 h-4 mr-2" />
                Ocultar Detalhes
              </>
            ) : (
              <>
                <FaEye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <FaChevronUp className="w-4 h-4 ml-2" /> : <FaChevronDown className="w-4 h-4 ml-2" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Cards dos dias - sempre visíveis */}
      <div className="forecast-grid">
        {forecast.daily.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="forecast-day-card"
            style={{
              backgroundColor: isDark ? 'rgba(55, 65, 81, 0.6)' : 'rgba(255, 255, 255, 0.7)',
              border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`
            }}
          >
            {/* Dia da semana */}
            <div className="day-header">
              <span className="day-name">{day.dayOfWeek}</span>
              <span className="day-date">{new Date(day.date).getDate()}</span>
            </div>

            {/* Ícone do clima */}
            <div className="weather-icon-container">
              {getWeatherIcon(day.icon, day.description)}
              <span className="weather-mood">{getWeatherMood(day.temperatureC)}</span>
            </div>

            {/* Temperatura */}
            <div className="temperature-section">
              <div className="temp-main">
                <span className="temp-value">{day.temperatureC}°</span>
              </div>
              <div className="temp-range">
                <span className="temp-min">{day.temperatureMin}°</span>
                <span className="temp-separator">/</span>
                <span className="temp-max">{day.temperatureMax}°</span>
              </div>
            </div>

            {/* Descrição */}
            <p className="weather-description">{day.description}</p>

            {/* Estatísticas básicas */}
            <div className="day-stats-basic">
              <div className="stat-item-basic">
                <FaTint className="w-3 h-3" style={{ color: colors.secondary }} />
                <span className="stat-value">{day.humidity}%</span>
              </div>
              <div className="stat-item-basic">
                <FaWind className="w-3 h-3" style={{ color: colors.accent }} />
                <span className="stat-value">{day.windSpeedKmh} km/h</span>
              </div>
            </div>

            {/* Indicador de tendência */}
            <div className="trend-indicator">
              <div 
                className="trend-bar"
                style={{
                  background: `linear-gradient(90deg, 
                    ${day.temperatureC > 20 ? '#EF4444' : '#3B82F6'} 0%, 
                    ${day.temperatureC > 20 ? '#FCA5A5' : '#93C5FD'} 100%)`
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detalhes expandidos */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="expanded-details"
          >
            {/* Estatísticas detalhadas por dia */}
            <div className="detailed-stats-grid">
              {forecast.daily.map((day, index) => (
                <motion.div
                  key={`detailed-${day.date}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="detailed-day-stats"
                  style={{
                    backgroundColor: isDark ? 'rgba(55, 65, 81, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                    border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.2)'}`
                  }}
                >
                  <h4 className="detailed-day-title">{day.dayOfWeek}</h4>
                  
                  <div className="detailed-stats-list">
                    <div className="detailed-stat-item">
                      <FaThermometerHalf className="w-4 h-4" style={{ color: colors.primary }} />
                      <div className="stat-details">
                        <span className="stat-label">Temperatura</span>
                        <span className="stat-value">{day.temperatureC}°C</span>
                      </div>
                    </div>
                    
                    <div className="detailed-stat-item">
                      <FaTint className="w-4 h-4" style={{ color: colors.secondary }} />
                      <div className="stat-details">
                        <span className="stat-label">Umidade</span>
                        <span className="stat-value">{day.humidity}%</span>
                      </div>
                    </div>
                    
                    <div className="detailed-stat-item">
                      <FaWind className="w-4 h-4" style={{ color: colors.accent }} />
                      <div className="stat-details">
                        <span className="stat-label">Vento</span>
                        <span className="stat-value">{day.windSpeedKmh} km/h</span>
                      </div>
                    </div>
                    
                    <div className="detailed-stat-item">
                      {getPrecipitationIcon(day.precipitation)}
                      <div className="stat-details">
                        <span className="stat-label">Precipitação</span>
                        <span 
                          className="stat-value"
                          style={{ color: getPrecipitationColor(day.precipitation) }}
                        >
                          {day.precipitation}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumo semanal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="weekly-summary"
            >
              <h4 className="summary-title">Resumo da Semana</h4>
              <div className="summary-stats">
                <div className="summary-item">
                  <FaThermometerHalf className="w-4 h-4" style={{ color: colors.primary }} />
                  <div className="summary-content">
                    <span className="summary-label">Temperatura Média</span>
                    <span className="summary-value">
                      {Math.round(forecast.daily.reduce((sum, day) => sum + day.temperatureC, 0) / forecast.daily.length)}°C
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <FaTint className="w-4 h-4" style={{ color: colors.secondary }} />
                  <div className="summary-content">
                    <span className="summary-label">Umidade Média</span>
                    <span className="summary-value">
                      {Math.round(forecast.daily.reduce((sum, day) => sum + day.humidity, 0) / forecast.daily.length)}%
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <FaWind className="w-4 h-4" style={{ color: colors.accent }} />
                  <div className="summary-content">
                    <span className="summary-label">Vento Médio</span>
                    <span className="summary-value">
                      {Math.round(forecast.daily.reduce((sum, day) => sum + day.windSpeedKmh, 0) / forecast.daily.length)} km/h
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
