import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Target } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import './ProgressBar.css'

interface ProgressBarProps {
  current: number
  max: number
  label: string
  type: 'temperature' | 'humidity' | 'wind' | 'general'
  showAchievement?: boolean
}

export default function ProgressBar({ current, max, label, type, showAchievement = false }: ProgressBarProps) {
  const { isDark, colorScheme } = useTheme()
  const percentage = Math.min((current / max) * 100, 100)

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

  const getTypeIcon = () => {
    switch (type) {
      case 'temperature':
        return <Target className="w-4 h-4" />
      case 'humidity':
        return <Star className="w-4 h-4" />
      case 'wind':
        return <Trophy className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getAchievementLevel = () => {
    if (percentage >= 90) return { level: 'Lendário', icon: '🏆', color: '#FFD700' }
    if (percentage >= 75) return { level: 'Épico', icon: '⭐', color: '#C0C0C0' }
    if (percentage >= 50) return { level: 'Raro', icon: '💎', color: '#FF6B6B' }
    if (percentage >= 25) return { level: 'Comum', icon: '🌱', color: '#51CF66' }
    return { level: 'Iniciante', icon: '🌱', color: '#868E96' }
  }

  const achievement = getAchievementLevel()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="progress-container"
    >
      <div className="progress-header">
        <div className="progress-label">
          {getTypeIcon()}
          <span className="label-text">{label}</span>
        </div>
        <div className="progress-stats">
          <span className="current-value">{current}</span>
          <span className="separator">/</span>
          <span className="max-value">{max}</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <motion.div
          className="progress-bar"
          style={{
            backgroundColor: isDark ? '#374151' : '#F3F4F6',
            border: `1px solid ${isDark ? '#4B5563' : '#E5E7EB'}`
          }}
        >
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 0 10px ${colors.primary}40`
            }}
          />
          
          {/* Marcadores de progresso */}
          {[25, 50, 75, 90].map((marker) => (
            <div
              key={marker}
              className="progress-marker"
              style={{
                left: `${marker}%`,
                backgroundColor: percentage >= marker ? colors.primary : (isDark ? '#6B7280' : '#D1D5DB')
              }}
            />
          ))}
        </motion.div>

        {/* Indicador de porcentagem */}
        <motion.div
          className="percentage-indicator"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{
            left: `${Math.min(percentage, 95)}%`,
            backgroundColor: colors.primary,
            color: '#FFFFFF'
          }}
        >
          {Math.round(percentage)}%
        </motion.div>
      </div>

      {/* Nível de Conquista */}
      {showAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="achievement-level"
        >
          <span className="achievement-icon">{achievement.icon}</span>
          <span 
            className="achievement-text"
            style={{ color: achievement.color }}
          >
            {achievement.level}
          </span>
        </motion.div>
      )}

      {/* Barra de experiência */}
      <div className="experience-bar">
        <motion.div
          className="exp-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})`,
            opacity: 0.6
          }}
        />
      </div>
    </motion.div>
  )
}
