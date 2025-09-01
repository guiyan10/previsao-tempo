# 🌤️ ClimaVision - Aplicação de Previsão do Tempo Extraordinária

Uma aplicação de previsão do tempo completamente transformada, que vai além do padrão para oferecer uma experiência única, moderna e envolvente.

## ✨ Características Principais

### 🎨 Design Diferenciado e Moderno
- **Glassmorphism** e **Neomorfismo** para interfaces elegantes
- **Animações fluidas** com Framer Motion
- **Microinterações** e efeitos visuais sutis
- **Layout responsivo** com mobile-first approach
- **Temas personalizáveis** com 5 esquemas de cores
- **Modo escuro/claro** com transições suaves

### 🚀 Interatividade e Experiência do Usuário
- **Dashboard interativo** com estatísticas avançadas
- **Insights inteligentes** baseados em dados meteorológicos
- **Sistema de conquistas** gamificado
- **Histórico de buscas** com tags interativas
- **Notificações elegantes** com React Hot Toast
- **Personalização completa** de temas e preferências

### 📊 Gráficos em Tempo Real
- **4 tipos de visualizações** diferentes:
  - Gráfico de área para temperatura
  - Gráfico de barras para umidade e vento
  - Gráfico de pizza para direção do vento
  - Gráfico de linha para tendências
- **Biblioteca Recharts** para gráficos interativos
- **Responsivos** e adaptáveis a diferentes dispositivos
- **Tooltips personalizados** com glassmorphism

### 🎯 Funcionalidades Avançadas
- **Análise inteligente** de condições climáticas
- **Recomendações personalizadas** baseadas no clima
- **Barras de progresso gamificadas** com níveis de conquista
- **Geolocalização automática** com permissões
- **API OpenWeather** integrada com endpoints completos
- **Cache local** para histórico de buscas

## 🛠️ Tecnologias Utilizadas

- **React 19** com TypeScript
- **Framer Motion** para animações
- **Recharts** para gráficos interativos
- **Lucide React** para ícones modernos
- **React Hot Toast** para notificações
- **CSS Modules** com variáveis CSS
- **Glassmorphism** e **Neomorfismo**
- **Responsive Design** com CSS Grid e Flexbox

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd previsao-tempo

# Instale as dependências
npm install

# Configure a chave da API OpenWeather
# Crie um arquivo .env na raiz do projeto:
echo "VITE_OPENWEATHER_API_KEY=sua_chave_aqui" > .env

# Execute a aplicação
npm run dev
```

### Configuração da API
1. Obtenha uma chave gratuita em [OpenWeather](https://openweathermap.org/api)
2. Crie um arquivo `.env` na raiz do projeto
3. Adicione: `VITE_OPENWEATHER_API_KEY=sua_chave_aqui`

## 🎨 Temas e Personalização

### Esquemas de Cores Disponíveis
- 🔵 **Azul** - Tema padrão, elegante e profissional
- 🟣 **Roxo** - Moderno e criativo
- 🟢 **Verde** - Fresco e natural
- 🟠 **Laranja** - Energético e vibrante
- 🩷 **Rosa** - Suave e acolhedor

### Modos de Exibição
- ☀️ **Modo Claro** - Ideal para uso diurno
- 🌙 **Modo Escuro** - Perfeito para uso noturno

## 📱 Funcionalidades por Dispositivo

### Desktop
- Layout em grid com múltiplas colunas
- Gráficos interativos completos
- Dashboard expandido com todas as estatísticas
- Hover effects e animações avançadas

### Tablet
- Layout adaptativo com breakpoints
- Gráficos responsivos
- Navegação otimizada para touch

### Mobile
- Layout em coluna única
- Gráficos compactos e otimizados
- Navegação por gestos
- Performance otimizada

## 🎯 Sistema de Conquistas

### Conquistas Disponíveis
- 🔥 **Desafiador do Calor** - Temperatura > 35°C
- ❄️ **Guerreiro do Frio** - Temperatura < 0°C
- 💧 **Mergulhador da Umidade** - Umidade > 90%
- 💨 **Cavaleiro do Vento** - Vento > 30 km/h
- 🧠 **Analista do Clima** - 3+ insights ativos

### Níveis de Progresso
- 🌱 **Iniciante** - 0-24%
- 🟢 **Comum** - 25-49%
- 💎 **Raro** - 50-74%
- ⭐ **Épico** - 75-89%
- 🏆 **Lendário** - 90-100%

## 📊 Componentes Principais

### WeatherCard
- Card principal com informações do clima
- Design glassmorphism com animações
- Estatísticas detalhadas e indicadores visuais

### WeatherDashboard
- Dashboard interativo com insights
- Estatísticas avançadas e tendências
- Sistema de conquistas e gamificação

### WeatherCharts
- 4 tipos de gráficos diferentes
- Responsivos e interativos
- Personalização por tema

### ThemeSelector
- Seletor de temas interativo
- 5 esquemas de cores
- Toggle modo escuro/claro

### ProgressBar
- Barras de progresso gamificadas
- Níveis de conquista
- Animações e efeitos visuais

## 🎨 Design System

### Cores
- **Primária**: Varia por tema
- **Secundária**: Complementar à primária
- **Acento**: Destaque para elementos especiais
- **Sucesso**: Verde para feedback positivo
- **Aviso**: Laranja para alertas
- **Erro**: Vermelho para erros

### Tipografia
- **Fonte**: Inter (sistema)
- **Hierarquia**: 5 níveis de heading
- **Pesos**: 400, 500, 600, 700, 800

### Espaçamento
- **Base**: 4px (0.25rem)
- **Escala**: 8, 12, 16, 20, 24, 32, 48, 64px

### Bordas
- **Raio**: 12px, 16px, 20px, 24px
- **Estilo**: Sólidas com transparência

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── WeatherCard/    # Card principal do clima
│   ├── WeatherDashboard/ # Dashboard interativo
│   ├── WeatherCharts/  # Gráficos meteorológicos
│   ├── ThemeSelector/  # Seletor de temas
│   └── ProgressBar/    # Barras de progresso
├── contexts/           # Contextos React
│   └── ThemeContext/   # Gerenciamento de temas
├── services/           # Serviços e APIs
│   └── weatherApi/     # API do OpenWeather
├── assets/             # Recursos estáticos
└── styles/             # Estilos globais
```

## 🌟 Recursos Avançados

### Animações
- **Entrada**: Fade in com slide
- **Hover**: Scale e translate
- **Transições**: Suaves e naturais
- **Loading**: Spinners e shimmer

### Performance
- **Lazy Loading** para componentes pesados
- **Memoização** para otimização
- **Debounce** para buscas
- **Cache local** para dados

### Acessibilidade
- **ARIA labels** completos
- **Navegação por teclado**
- **Contraste adequado**
- **Screen reader friendly**

## 🚀 Roadmap Futuro

- [ ] **Previsão de 7 dias** com gráficos avançados
- [ ] **Mapas interativos** com condições climáticas
- [ ] **Alertas meteorológicos** em tempo real
- [ ] **Widgets personalizáveis** para desktop
- [ ] **Integração com calendário** para planejamento
- [ ] **API de qualidade do ar** em tempo real
- [ ] **Notificações push** para mudanças climáticas
- [ ] **Modo offline** com cache avançado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **OpenWeather** pela API gratuita
- **Framer Motion** pelas animações incríveis
- **Recharts** pelos gráficos interativos
- **Lucide** pelos ícones modernos
- **React Hot Toast** pelas notificações elegantes

---

**ClimaVision** - Transformando a experiência de previsão do tempo! 🌤️✨

