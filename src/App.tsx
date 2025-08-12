import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import { getWeatherByCity, getWeatherByCoords, type CurrentWeather } from './services/weatherApi'

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(city?: string) {
    const search = (city ?? query).trim()
    if (!search) return
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherByCity(search)
      setWeather(data)
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Não foi possível obter o clima para esta cidade.'
      setError(message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleUseLocation() {
    if (!('geolocation' in navigator)) {
      setError('Geolocalização não suportada neste dispositivo.')
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          setWeather(data)
        } catch (err: any) {
          const message = err?.response?.data?.message || 'Falha ao obter clima pela sua localização.'
          setError(message)
          setWeather(null)
        } finally {
          setLoading(false)
        }
      },
      (geoErr) => {
        setLoading(false)
        setError(geoErr.message || 'Permissão de localização negada.')
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  useEffect(() => {
    // Tenta buscar automaticamente via localização ao carregar
    handleUseLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app container py-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-4 p-3 mb-4 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand d-flex align-items-center gap-2">
            <i className="bi bi-cloud-sun-fill text-primary"></i>
            <span className="fw-bold">Clima Agora</span>
          </span>
          <div className="d-flex gap-2 ms-auto">
            <button
              className="btn btn-outline-info d-flex align-items-center gap-2"
              onClick={handleUseLocation}
              aria-label="Usar minha localização"
            >
              <i className="bi bi-geo-alt-fill"></i>
              Localização
            </button>
          </div>
        </div>
      </nav>

      <section className="hero mb-4 p-3 p-md-4 rounded-4 shadow-sm">
        <h1 className="title fw-bold mb-3">Clima Agora</h1>
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
              <input
                className="form-control search-input"
                type="text"
                placeholder="Digite o nome da cidade (ex: São Paulo)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-auto">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={() => handleSearch()}
              aria-label="Buscar cidade"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      <div className="row g-4 align-items-stretch">
        <div className="col-12 col-md-7 col-xl-6 d-flex">
          <WeatherCard weather={weather} loading={loading} error={error} />
        </div>
        <div className="col-12 col-md-5 col-xl-6 d-flex">
          <div className="card tips-card border-0 shadow rounded-4 p-3 w-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Dicas rápidas</h5>
              <ul className="list-unstyled small mb-0 d-grid gap-2">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-thermometer-sun text-danger"></i>
                  Verifique a temperatura antes de sair.
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-umbrella-fill text-primary"></i>
                  Se chover, use guarda-chuva.
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-wind text-info"></i>
                  Ventos fortes? Evite roupas leves.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-4 small text-muted text-center">Dados de clima por OpenWeather</footer>
    </div>
  )
}

export default App
