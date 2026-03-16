# BarberSync 💈
**Sistema de Gestión de Turnos para Barberías — by ClickBite**

Demo MVP de la plataforma WaaS (Web as a Service) para barberías.

## Stack
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Inicio rápido
```bash
npm install
npm run dev
```

## Deploy en Vercel
1. Subir a GitHub
2. Importar en vercel.com
3. Click en Deploy (la config en `vercel.json` ya está lista)

## Configuración
Antes de poner en producción, editar `src/lib/constants.js`:
```js
// Reemplazar con el número real del barbero (sin +, formato internacional)
export const BARBERO_WHATSAPP = '5492236XXXXXX'

// Personalizar horarios no disponibles según la agenda real
export const UNAVAILABLE_SLOTS = ['10:00', '11:30', ...]
```

## Personalización por cliente
- Colores: `tailwind.config.js` → `theme.extend.colors.brand`
- Servicios y precios: `src/lib/constants.js` → `SERVICES`
- Nombre del negocio: `index.html` → `<title>`

---
*ClickBite · Infraestructura Digital WaaS · 2024*
