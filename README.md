# Kunder - Udlejningsselskab Landing Page

En moderne, minimalistisk landing page for Kunder udlejningsselskab med kode-beskyttet adgang.

## 🚀 Tech Stack

- **Next.js 14** - React framework med App Router
- **TypeScript** - Type safety og bedre udvikleroplevelse
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animeringer og interaktioner
- **Lucide React** - Moderne ikoner

## ✨ Features

- 🔐 **Kode-beskyttet adgang** - Kun brugere med korrekt kode kan komme ind
- 🎨 **Minimalistisk design** - Flot og moderne UI
- 📱 **Fuld responsiv** - Fungerer perfekt på alle enheder
- ⚡ **Hurtig performance** - Optimiseret for hurtig indlæsning
- 🎭 **Interaktive animeringer** - Smooth overgange og hover-effekter
- 🌟 **Moderne gradienter** - Flotte farveovergange

## 🛠️ Installation

1. Installer dependencies:
```bash
npm install
```

2. Start udviklingsserveren:
```bash
npm run dev
```

3. Åbn [http://localhost:3000](http://localhost:3000) i din browser

## 🔑 Adgangskode

Standard adgangskode: `KUNDER2024`

## 📁 Projektstruktur

```
├── app/
│   ├── globals.css          # Globale styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Hovedside
├── components/
│   ├── AccessCodeModal.tsx  # Kode-beskyttet modal
│   ├── Hero.tsx             # Hero sektion
│   ├── Features.tsx         # Features sektion
│   └── Footer.tsx           # Footer
├── lib/
│   └── auth.ts              # Autentificering logik
└── public/                  # Statiske filer
```

## 🎨 Design System

- **Primære farver**: Blå og lilla gradienter
- **Typografi**: Inter font family
- **Komponenter**: Glassmorphism design
- **Animerings**: Framer Motion for smooth overgange

## 🚀 Deployment

Projektet er klar til deployment på Vercel, Netlify eller lignende platforme.

```bash
npm run build
npm start
```

## 📱 Responsivt Design

- Mobile-first tilgang
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimiseret for alle skærmstørrelser

## ⚡ Performance

- Next.js Image optimization
- Lazy loading af komponenter
- Minimale bundle størrelse
- Optimerede animeringer
