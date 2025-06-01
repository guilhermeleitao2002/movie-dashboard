# CineMetrics - Movie Explorer Dashboard

## Live Demo
[View Dashboard](https://guilhermeleitao2002.github.io/movie-dashboard/)

## Description
An interactive movie analytics dashboard for exploring film data, ratings, financial performance, and industry trends.

## Features
- Interactive movie database with filtering
- Genre distribution visualization
- Financial performance analysis
- Timeline and trend analysis
- Director performance rankings

## Technologies
- React 18
- Recharts for visualizations
- Tailwind CSS for styling
- Vite for build tooling
- GitHub Pages for hosting

## Tasks Accomplished
1. Browse and filter movies by genre, year, and rating
2. Analyze movie financial performance and ROI
3. Explore rating trends over time
4. Compare director performance
5. Visualize genre distribution
6. Interactive selection between linked components

## Local Development
```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
npm run deploy
```

## Troubleshooting

### If page shows 404:
1. Check repository settings → Pages is enabled
2. Verify `base` in `vite.config.js` matches your repo name
3. Wait 5-10 minutes for initial deployment

### If styles don't load:
1. Ensure Tailwind CDN link is in `index.html`
2. Check browser console for errors

### If build fails:
1. Ensure all dependencies are in `package.json`
2. Check Node version (use 16+ for Vite)

Your live demo will be at:
`https://guilhermeleitao2002.github.io/movie-dashboard/`