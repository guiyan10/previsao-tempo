import React from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import type { CurrentWeather } from '../services/weatherApi'
import './WeatherCharts.css'

interface WeatherChartsProps {
  weather: CurrentWeather
}

export default function WeatherCharts({ weather }: WeatherChartsProps) {
  const { isDark, colorScheme } = useTheme()

  // Dados simulados para demonstração (em uma aplicação real, viriam da API)
  const hourlyData = [
    { time: '00:00', temp: weather.temperatureC - 2, humidity: weather.humidity - 5, wind: weather.windSpeedKmh - 2 },
    { time: '06:00', temp: weather.temperatureC - 1, humidity: weather.humidity - 2, wind: weather.windSpeedKmh - 1 },
    { time: '12:00', temp: weather.temperatureC, humidity: weather.humidity, wind: weather.windSpeedKmh },
    { time: '18:00', temp: weather.temperatureC + 1, humidity: weather.humidity + 3, wind: weather.windSpeedKmh + 1 },
    { time: '24:00', temp: weather.temperatureC - 1, humidity: weather.humidity - 1, wind: weather.windSpeedKmh - 1 },
  ]

  const windData = [
    { direction: 'N', value: 20 },
    { direction: 'NE', value: 15 },
    { direction: 'E', value: 25 },
    { direction: 'SE', value: 10 },
    { direction: 'S', value: 30 },
    { direction: 'SW', value: 5 },
    { direction: 'W', value: 35 },
    { direction: 'NW', value: 15 },
  ]

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

  return (
    <div className="weather-charts">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="charts-grid"
      >
        {/* Gráfico de Temperatura */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="chart-card"
        >
          <h3 className="chart-title">Temperatura ao Longo do Dia</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="time" 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke={colors.primary} 
                fill="url(#tempGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico de Umidade */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="chart-card"
        >
          <h3 className="chart-title">Umidade e Vento</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="time" 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="humidity" fill={colors.secondary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="wind" fill={colors.accent} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico de Direção do Vento */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="chart-card"
        >
          <h3 className="chart-title">Direção do Vento</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={windData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {windData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={[colors.primary, colors.secondary, colors.accent, '#F59E0B', '#10B981'][index % 5]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico de Linha para Tendências */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="chart-card"
        >
          <h3 className="chart-title">Tendência de Temperatura</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="time" 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke={colors.primary} 
                strokeWidth={3}
                dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: colors.primary, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  )
}
