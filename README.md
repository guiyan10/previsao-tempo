# Clima Agora (React + Vite)

Aplicativo de clima que consome a API do OpenWeather. Permite buscar o clima atual pela geolocalização do dispositivo ou digitando o nome da cidade.

## Requisitos atendidos
- Busca por geolocalização e por cidade (input de texto)
- Requisições HTTP com Axios
- Gerenciamento de estado com hooks (`useState`, `useEffect`)
- Exibe: temperatura, descrição, ícone, umidade e velocidade do vento
- Tratamento de erros e feedback de carregamento
- Layout responsivo para mobile
- Pronto para deploy (Vercel/Netlify)

## Pré-requisitos
- Node 18+
- Chave da API do OpenWeather

## Configuração da API
Crie um arquivo `.env` na raiz do projeto com o conteúdo abaixo (não comite sua chave pública):

```
VITE_OPENWEATHER_API_KEY=COLE_SUA_CHAVE_AQUI
```

Você pode usar a chave fornecida no enunciado para testes: `76776bc347f3cc57b043c9b695eed879`

> Obs.: Em ambientes de produção (deploy), configure essa variável como Secret/Environment Variable na plataforma de hospedagem.

## Rodando localmente
```bash
npm install
npm run dev
```
Abra `http://localhost:5173` no navegador.

## Build
```bash
npm run build
npm run preview
```

## Deploy (Vercel)
1. Faça login em `https://vercel.com`
2. Importe este repositório
3. Em Project Settings > Environment Variables, adicione `VITE_OPENWEATHER_API_KEY`
4. Deploy

## Estrutura principal
- `src/services/weatherApi.ts`: client da API do OpenWeather
- `src/components/WeatherCard.tsx`: card com as informações de clima
- `src/App.tsx`: lógica de busca (cidade e geolocalização)

## Captura de tela
Adicione aqui uma captura do app em execução após rodar localmente.

