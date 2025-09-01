import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import './WeatherCard.css'
import type { CurrentWeather } from '../services/weatherApi'

interface WeatherCardProps {
  weather: CurrentWeather | null
  loading: boolean
  error: string | null
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  const { isDark, colorScheme } = useTheme()

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="weather-card loading"
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
          <p className="loading-text">Carregando dados do clima...</p>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="weather-card error"
        style={{
          backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`
        }}
      >
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      </motion.div>
    )
  }

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="weather-card empty"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`
        }}
      >
        <div className="empty-content">
          <div className="empty-icon">🌤️</div>
          <p className="empty-text">Busque uma cidade ou use a sua localização para ver o clima.</p>
        </div>
      </motion.div>
    )
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`
  const colors = getColorScheme()

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

  const getWeatherMood = () => {
    if (weather.temperatureC >= 25) return '😎'
    if (weather.temperatureC >= 20) return '😊'
    if (weather.temperatureC >= 15) return '😌'
    if (weather.temperatureC >= 10) return '🧥'
    return '❄️'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.5 }}
      className="weather-card"
      style={{
        background: `linear-gradient(135deg, 
          ${isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'} 0%, 
          ${isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(249, 250, 251, 0.8)'} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`,
        boxShadow: `0 25px 50px -12px ${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`
      }}
    >
      {/* Header com localização e clima */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="weather-header"
      >
        <div className="location-info">
          <div className="location-icon">
            <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
          <div className="location-details">
            <h2 className="city-name">{weather.city}</h2>
            {weather.countryCode && (
              <p className="country-code">{weather.countryCode}</p>
            )}
          </div>
        </div>
        
        <div className="weather-mood">
          <span className="mood-emoji">{getWeatherMood()}</span>
        </div>
      </motion.div>

      {/* Ícone do clima */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="weather-icon-container"
      >
        <img 
          className="weather-icon" 
          src={iconUrl} 
          alt={weather.description}
          style={{ filter: isDark ? 'brightness(0.9)' : 'none' }}
        />
        <p className="weather-description">{weather.description}</p>
      </motion.div>

      {/* Temperatura principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="temperature-section"
      >
        <div className="temperature-display">
          <span className="temperature-value">{Math.round(weather.temperatureC)}</span>
          <span className="temperature-unit">°C</span>
        </div>
        <div className="temperature-feels">
          <span className="feels-label">Sensação térmica</span>
        </div>
      </motion.div>

      {/* Estatísticas detalhadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="weather-stats"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat-item"
          style={{ borderColor: colors.primary }}
        >
          <div className="stat-icon" style={{ backgroundColor: colors.primary }}>
            <Thermometer className="w-4 h-4" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{Math.round(weather.temperatureC)}°C</span>
            <span className="stat-label">Temperatura</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat-item"
          style={{ borderColor: colors.secondary }}
        >
          <div className="stat-icon" style={{ backgroundColor: colors.secondary }}>
            <Droplets className="w-4 h-4" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{weather.humidity}%</span>
            <span className="stat-label">Umidade</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat-item"
          style={{ borderColor: colors.accent }}
        >
          <div className="stat-icon" style={{ backgroundColor: colors.accent }}>
            <Wind className="w-4 h-4" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{weather.windSpeedKmh} km/h</span>
            <span className="stat-label">Vento</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Indicador de qualidade do ar (simulado) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="air-quality"
      >
        <div className="air-quality-header">
          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
          <span className="air-quality-label">Qualidade do Ar</span>
        </div>
        <div className="air-quality-indicator">
          <div 
            className="air-quality-bar"
            style={{ backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
          >
            <motion.div
              className="air-quality-fill"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ backgroundColor: colors.primary }}
            />
          </div>
          <span className="air-quality-text">Boa</span>
        </div>
      </motion.div>
    </motion.div>
  )
}


