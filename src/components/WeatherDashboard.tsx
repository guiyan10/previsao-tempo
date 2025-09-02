import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaThermometerHalf, FaTint, FaWind, FaEye, FaAward, FaBullseye, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'
import type { CurrentWeather } from '../services/weatherApi'
import './WeatherDashboard.css'

interface WeatherDashboardProps {
  weather: CurrentWeather
}

interface WeatherInsight {
  type: 'info' | 'warning' | 'success'
  message: string
  icon: React.ReactNode
}

export default function WeatherDashboard({ weather }: WeatherDashboardProps) {
  const { isDark, colorScheme } = useTheme()
  const [insights, setInsights] = useState<WeatherInsight[]>([])
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievements, setShowAchievements] = useState(false)

  useEffect(() => {
    generateInsights()
    checkAchievements()
  }, [weather])

  const generateInsights = () => {
    const newInsights: WeatherInsight[] = []

    // Análise de temperatura
    if (weather.temperatureC > 30) {
      newInsights.push({
        type: 'warning',
        message: 'Temperatura alta! Mantenha-se hidratado e evite exposição prolongada ao sol.',
        icon: <FaThermometerHalf className="w-5 h-5" />
      })
    } else if (weather.temperatureC < 10) {
      newInsights.push({
        type: 'warning',
        message: 'Temperatura baixa! Use roupas adequadas para o frio.',
        icon: <FaThermometerHalf className="w-5 h-5" />
      })
    }

    // Análise de umidade
    if (weather.humidity > 80) {
      newInsights.push({
        type: 'info',
        message: 'Umidade elevada. Pode haver sensação de abafamento.',
        icon: <FaTint className="w-5 h-5" />
      })
    } else if (weather.humidity < 30) {
      newInsights.push({
        type: 'warning',
        message: 'Umidade baixa. Hidrate-se bem e use hidratante para a pele.',
        icon: <FaTint className="w-5 h-5" />
      })
    }

    // Análise de vento
    if (weather.windSpeedKmh > 20) {
      newInsights.push({
        type: 'warning',
        message: 'Ventos fortes! Evite roupas leves e objetos soltos.',
        icon: <FaWind className="w-5 h-5" />
      })
    }

    // Condições ideais
    if (weather.temperatureC >= 18 && weather.temperatureC <= 25 && weather.humidity >= 40 && weather.humidity <= 60) {
      newInsights.push({
        type: 'success',
        message: 'Condições climáticas ideais para atividades ao ar livre!',
        icon: <FaArrowUp className="w-5 h-5" />
      })
    }

    setInsights(newInsights)
  }

  const checkAchievements = () => {
    const newAchievements: string[] = []

    if (weather.temperatureC > 35) {
      newAchievements.push('🔥 Desafiador do Calor')
    }
    if (weather.temperatureC < 0) {
      newAchievements.push('❄️ Guerreiro do Frio')
    }
    if (weather.humidity > 90) {
      newAchievements.push('💧 Mergulhador da Umidade')
    }
    if (weather.windSpeedKmh > 30) {
      newAchievements.push('💨 Cavaleiro do Vento')
    }
    if (insights.length >= 3) {
      newAchievements.push('🧠 Analista do Clima')
    }

    setAchievements(newAchievements)
  }

  const getColorScheme = () => {
    const colors = {
      blue: { primary: '#3B82F6', secondary: '#60A5FA', accent: '#1E40AF' },
      purple: { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#5B21B6' },
      green: { primary: '#10B981', secondary: '#34D399', accent: '#047857' },
      orange: { primary: '#F59E0B', secondary: '#FBBF24', accent: '#D97706' },
      pink: { primary: '#EC4899', secondary: '#F472B6', accent: '#BE185D' },
    }
    return colors[colorScheme]
  }

  const colors = getColorScheme()

  const getWeatherMood = () => {
    if (weather.temperatureC >= 25 && weather.humidity <= 60) return '😎 Perfeito para atividades ao ar livre!'
    if (weather.temperatureC >= 20 && weather.temperatureC < 25) return '😊 Clima agradável e confortável'
    if (weather.temperatureC >= 15 && weather.temperatureC < 20) return '😌 Temperatura fresca e revigorante'
    if (weather.temperatureC < 15) return '🧥 Hora de se agasalhar bem'
    return '🌡️ Clima variável, fique atento às mudanças'
  }

  return (
    <div className="weather-dashboard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-container"
      >
        {/* Header do Dashboard */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="dashboard-header"
        >
          <div className="header-content">
            <h2 className="dashboard-title">
              <FaBullseye className="w-6 h-6 mr-2" />
              Dashboard Meteorológico
            </h2>
            <p className="dashboard-subtitle">{getWeatherMood()}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAchievements(!showAchievements)}
            className="achievements-btn"
            style={{ backgroundColor: colors.primary }}
          >
            <FaAward className="w-5 h-5" />
            <span className="achievement-count">{achievements.length}</span>
          </motion.button>
        </motion.div>

        {/* Estatísticas Principais */}
        <div className="stats-grid">
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="stat-card"
            style={{ borderColor: colors.primary }}
          >
            <div className="stat-icon" style={{ backgroundColor: colors.primary }}>
              <FaThermometerHalf className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{Math.round(weather.temperatureC)}°C</h3>
              <p className="stat-label">Temperatura Atual</p>
              <div className="stat-trend">
                {weather.temperatureC > 25 ? (
                  <FaArrowUp className="w-4 h-4 text-red-500" />
                ) : (
                  <FaArrowDown className="w-4 h-4 text-blue-500" />
                )}
                <span className="trend-text">
                  {weather.temperatureC > 25 ? 'Acima da média' : 'Abaixo da média'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="stat-card"
            style={{ borderColor: colors.secondary }}
          >
            <div className="stat-icon" style={{ backgroundColor: colors.secondary }}>
              <FaTint className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{weather.humidity}%</h3>
              <p className="stat-label">Umidade Relativa</p>
              <div className="stat-trend">
                {weather.humidity > 60 ? (
                  <FaArrowUp className="w-4 h-4 text-blue-500" />
                ) : (
                  <FaArrowDown className="w-4 h-4 text-orange-500" />
                )}
                <span className="trend-text">
                  {weather.humidity > 60 ? 'Umidade elevada' : 'Umidade baixa'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="stat-card"
            style={{ borderColor: colors.accent }}
          >
            <div className="stat-icon" style={{ backgroundColor: colors.accent }}>
              <FaWind className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{weather.windSpeedKmh} km/h</h3>
              <p className="stat-label">Velocidade do Vento</p>
              <div className="stat-trend">
                {weather.windSpeedKmh > 15 ? (
                  <FaArrowUp className="w-4 h-4 text-yellow-500" />
                ) : (
                  <FaArrowDown className="w-4 h-4 text-green-500" />
                )}
                <span className="trend-text">
                  {weather.windSpeedKmh > 15 ? 'Ventos moderados' : 'Ventos leves'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Inteligentes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="insights-section"
        >
          <h3 className="insights-title">
            <FaEye className="w-5 h-5 mr-2" />
            Insights Inteligentes
          </h3>
          <div className="insights-grid">
            <AnimatePresence>
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`insight-card insight-${insight.type}`}
                >
                  <div className="insight-icon">{insight.icon}</div>
                  <p className="insight-message">{insight.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Conquistas */}
        <AnimatePresence>
          {showAchievements && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="achievements-section"
            >
              <h3 className="achievements-title">
                <FaAward className="w-5 h-5 mr-2" />
                Suas Conquistas
              </h3>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="achievement-badge"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {achievement}
                  </motion.div>
                ))}
                {achievements.length === 0 && (
                  <p className="no-achievements">
                    Continue explorando o clima para desbloquear conquistas!
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
