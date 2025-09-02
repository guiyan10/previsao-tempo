import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPalette, FaSun, FaMoon, FaCog, FaTimes } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'
import './ThemeSelector.css'

export function ThemeSelector() {
  const { mode, colorScheme, toggleMode, setColorScheme, isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const colorSchemes = [
    { name: 'blue', color: '#3B82F6' },
    { name: 'purple', color: '#8B5CF6' },
    { name: 'green', color: '#10B981' },
    { name: 'orange', color: '#F59E0B' },
    { name: 'pink', color: '#EC4899' }
  ] as const

  return (
    <div className="theme-selector">
      <motion.button
        className="theme-toggle-btn"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
        }}
      >
        <FaCog size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
            }}
          >
            {/* Botão de fechar */}
            <div className="theme-close-btn">
              <button onClick={closeMenu} className="close-btn">
                <FaTimes size={16} />
              </button>
            </div>

            {/* Seção de Modo */}
            <div className="theme-section">
              <h3 className="section-title">
                <FaPalette size={16} />
                MODO
              </h3>
              <button
                className="mode-toggle"
                onClick={toggleMode}
                style={{
                  background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                }}
              >
                {isDark ? <FaMoon size={16} /> : <FaSun size={16} />}
                {isDark ? 'Escuro' : 'Claro'}
              </button>
            </div>

            {/* Seção de Esquema de Cores */}
            <div className="theme-section">
              <h3 className="section-title">
                <FaPalette size={16} />
                ESQUEMA DE CORES
              </h3>
              <div className="color-options">
                {colorSchemes.map((scheme) => (
                  <motion.button
                    key={scheme.name}
                    className={`color-option ${colorScheme === scheme.name ? 'active' : ''}`}
                    onClick={() => setColorScheme(scheme.name)}
                    style={{ background: scheme.color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {colorScheme === scheme.name && (
                      <motion.span
                        className="checkmark"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Seção de Preview */}
            <div className="theme-section">
              <h3 className="section-title">
                <FaPalette size={16} />
                PREVIEW
              </h3>
              <div className="theme-preview">
                <div
                  className="preview-card"
                  style={{
                    background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                  }}
                >
                  <div
                    className="preview-accent"
                    style={{ background: colorSchemes.find(s => s.name === colorScheme)?.color }}
                  />
                  <div className="preview-content">
                    <div
                      className="preview-text"
                      style={{ color: isDark ? 'white' : 'black' }}
                    >
                      Exemplo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
