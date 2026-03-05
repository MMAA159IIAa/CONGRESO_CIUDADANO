# Guía de Despliegue: Congreso Ciudadano

Sigue estos pasos para poner tu página en línea y que todos puedan participar.

## 1. Preparar el Repositorio
Asegúrate de que todos los cambios estén guardados en tu repositorio de GitHub.

## 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New"** > **"Project"**.
3. Selecciona el repositorio `CONGRESO_CIUDADANO`.

## 3. Configurar Variables de Entorno (CRÍTICO)
Antes de darle a **Deploy**, expande la sección de **Environment Variables** y añade las siguientes (cópiatelas de tu archivo `.env.local`):

- `VITE_SUPABASE_URL`: Tu URL de proyecto de Supabase.
- `VITE_SUPABASE_ANON_KEY`: Tu llave anon de Supabase.

## 4. Desplegar
Haz clic en **"Deploy"**. Vercel detectará automáticamente que es un proyecto de Vite y configurará el build.

## 5. Próximos Pasos (Donaciones)
Una vez que tengas tu URL de producción (ej: `congreso-ciudadano.vercel.app`):
1. Ve a `src/pages/Donaciones.jsx`.
2. Reemplaza `https://www.paypal.me/TU_CUENTA` con tu enlace real.
3. Reemplaza `https://buy.stripe.com/TU_LINK_DE_PAGO` con tu enlace de Stripe real.

¡Listo! Tu página ya estará funcionando para todo México.
