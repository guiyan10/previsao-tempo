import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Sun, Moon, Cloud, Zap, TrendingUp } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherDashboard from './components/WeatherDashboard'
import WeatherCharts from './components/WeatherCharts'
import WeeklyForecast from './components/WeeklyForecast'
import { ThemeSelector } from './components/ThemeSelector'
import ProgressBar from './components/ProgressBar'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { getWeatherByCity, getWeatherByCoords, getWeeklyForecastByCity, getWeeklyForecastByCoords, type CurrentWeather, type WeeklyForecast as WeeklyForecastType } from './services/weatherApi'

function AppContent() {
  const { isDark, colorScheme } = useTheme()
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showCharts, setShowCharts] = useState(false)

  async function handleSearch(city?: string) {
    const search = (city ?? query).trim()
    if (!search) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Buscar clima atual e previsão semanal em paralelo
      const [currentData, weeklyData] = await Promise.all([
        getWeatherByCity(search),
        getWeeklyForecastByCity(search)
      ])
      
      setWeather(currentData)
      setWeeklyForecast(weeklyData)
      
      // Adicionar ao histórico
      if (!searchHistory.includes(search)) {
        setSearchHistory(prev => [search, ...prev.slice(0, 4)])
      }
      
      toast.success(`Clima de ${currentData.city} carregado com sucesso!`)
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Não foi possível obter o clima para esta cidade.'
      setError(message)
      setWeather(null)
      setWeeklyForecast(null)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUseLocation() {
    if (!('geolocation' in navigator)) {
      toast.error('Geolocalização não suportada neste dispositivo.')
      return
    }
    
    setLoading(true)
    setError(null)
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          // Buscar clima atual e previsão semanal em paralelo
          const [currentData, weeklyData] = await Promise.all([
            getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            getWeeklyForecastByCoords(pos.coords.latitude, pos.coords.longitude)
          ])
          
          setWeather(currentData)
          setWeeklyForecast(weeklyData)
          toast.success(`Clima da sua localização carregado!`)
        } catch (err: any) {
          const message = err?.response?.data?.message || 'Falha ao obter clima pela sua localização.'
          setError(message)
          setWeather(null)
          setWeeklyForecast(null)
          toast.error(message)
        } finally {
          setLoading(false)
        }
      },
      (geoErr) => {
        setLoading(false)
        const message = geoErr.message || 'Permissão de localização negada.'
        setError(message)
        toast.error(message)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  useEffect(() => {
    // Tenta buscar automaticamente via localização ao carregar
    handleUseLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <div className="app" data-theme={isDark ? 'dark' : 'light'} data-color-scheme={colorScheme}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#1F2937' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : '#374151',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
          },
        }}
      />

      {/* Header com navegação */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-header"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`
        }}
      >
        <div className="header-content">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="logo"
          >
            <Cloud className="w-8 h-8" style={{ color: colors.primary }} />
            <span className="logo-text">ClimaVision</span>
          </motion.div>

          <div className="header-actions">
            <ThemeSelector />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUseLocation}
              className="location-btn"
              style={{ backgroundColor: colors.secondary }}
            >
              <MapPin className="w-4 h-4" />
              <span>Localização</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hero-section"
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-title"
          >
            Descubra o <span style={{ color: colors.primary }}>Clima</span> do Mundo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-subtitle"
          >
            Previsões precisas, insights inteligentes e visualizações extraordinárias
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="search-container"
          >
            <div className="search-input-group">
              <div className="search-icon">
                <Search className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <input
                className="search-input"
                type="text"
                placeholder="Digite o nome da cidade..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
                style={{
                  backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.5)'}`,
                  color: isDark ? '#FFFFFF' : '#374151'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch()}
                className="search-btn"
                style={{ backgroundColor: colors.primary }}
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </motion.button>
            </div>

            {/* Histórico de buscas */}
            {searchHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="search-history"
              >
                <span className="history-label">Buscas recentes:</span>
                <div className="history-tags">
                  {searchHistory.map((city, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSearch(city)}
                      className="history-tag"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {city}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Conteúdo Principal */}
      <main className="main-content">
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="weather-content"
          >
            {/* Dashboard e Card Principal */}
            <div className="weather-main-grid">
              <div className="weather-card-section">
                <WeatherCard weather={weather} loading={loading} error={error} />
              </div>
              
              <div className="dashboard-section">
                <WeatherDashboard weather={weather} />
              </div>
            </div>

            {/* Previsão Semanal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="weekly-forecast-section"
            >
              <WeeklyForecast forecast={weeklyForecast} loading={loading} />
            </motion.div>

            {/* Barras de Progresso Gamificadas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="progress-section"
            >
              <h3 className="section-title">
                <TrendingUp className="w-5 h-5 mr-2" />
                Seu Progresso Climático
              </h3>
              <div className="progress-grid">
                <ProgressBar
                  current={Math.abs(weather.temperatureC)}
                  max={50}
                  label="Temperatura"
                  type="temperature"
                  showAchievement
                />
                <ProgressBar
                  current={weather.humidity}
                  max={100}
                  label="Umidade"
                  type="humidity"
                  showAchievement
                />
                <ProgressBar
                  current={weather.windSpeedKmh}
                  max={50}
                  label="Velocidade do Vento"
                  type="wind"
                  showAchievement
                />
              </div>
            </motion.div>

            {/* Gráficos Interativos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="charts-section"
            >
              <div className="charts-header">
                <h3 className="section-title">
                  <Zap className="w-5 h-5 mr-2" />
                  Visualizações Avançadas
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCharts(!showCharts)}
                  className="toggle-charts-btn"
                  style={{ backgroundColor: colors.primary }}
                >
                  {showCharts ? 'Ocultar' : 'Mostrar'} Gráficos
                </motion.button>
              </div>

              <AnimatePresence>
                {showCharts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <WeatherCharts weather={weather} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* Estado inicial */}
        {!weather && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="welcome-section"
          >
            <div className="welcome-content">
              <div className="welcome-icon">🌤️</div>
              <h2 className="welcome-title">Bem-vindo ao BanksWeather</h2>
              <p className="welcome-text">
                Digite o nome de uma cidade ou use sua localização para começar a explorar o clima
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUseLocation}
                className="welcome-btn"
                style={{ backgroundColor: colors.primary }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Usar Minha Localização
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="app-footer"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(249, 250, 251, 0.9)',
          borderTop: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`
        }}
      >
        <div className="footer-content">
          <p className="footer-text">
            Dados de clima por <strong>OpenWeather</strong> • 
            Criado com ❤️ e tecnologia moderna
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
