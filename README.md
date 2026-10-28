# SherpARQ Corporate Website + AI Chat

Sitio web corporativo moderno para empresa de servicios de ingeniería, desarrollado con React (Frontend) y Cloudflare Workers (Backend AI).

## Estructura de Servicios
El sitio está reorientado a 6 Nodos de Conocimiento:
1. Gestión Regulatoria
2. Ingeniería Arquitectónica
3. Geomática y 3D
4. Optimización Logística
5. Visualización Técnica
6. Infraestructura Crítica HSE

---

## 🚀 Parte 1: Frontend (GitHub Pages)

### Tecnologías
- React 19
- TypeScript
- Tailwind CSS (CDN)
- Lucide Icons
- Vite (Build tool)

### Instalación Local

```bash
cd /home/fermaf/Dropbox/empresas/sherpARQ/codigo/frontend
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Build de Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados para producción.

---

## 📤 Despliegue a GitHub Pages

### Configuración Actual
- **Repositorio:** `sherparq/frontend`
- **URL:** https://sherparq.github.io/frontend/
- **Rama de despliegue:** `main`
- **Carpeta de despliegue:** `/docs` (Nueva configuración requerida)

### Opción 1: Script Automatizado (Recomendado)

```bash
./deploy.sh "Mensaje de commit opcional"
```

El script hace:
1. ✅ Build de producción a carpeta `docs/`
2. ✅ Commit de cambios
3. ✅ Push a `origin/main`

### Opción 2: Despliegue Manual

```bash
# 1. Build (genera carpeta docs/)
npm run build

# 2. Commit y push
git add .
git commit -m "Update: descripción de cambios"
git push origin main
```

### ⚠️ Configuración Requerida en GitHub Pages

Para solucionar el error 404, debes cambiar la configuración en GitHub:

1. Ve a **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`
4. **Folder:** Selecciona `/docs` (en lugar de `/root`)
5. Guarda los cambios

⏳ **Nota:** GitHub Pages tarda 1-2 minutos en actualizar después del cambio.

---

## 🤖 Parte 2: Backend AI (Cloudflare Worker)

### Configuración Actual

- **Worker URL:** `https://sherparq-backend.abogado.workers.dev`
- **Repositorio:** `/home/fermaf/Dropbox/empresas/sherpARQ/codigo/backend`
- **Modelo LLM:** `gpt-4.1-nano` (OpenAI)
- **Temperatura:** `0.3` (respuestas precisas y consistentes)

### Características del Backend

El Worker implementa:
- ✅ **CORS configurado** para `https://sherparq.github.io`
- ✅ **System Prompt personalizado** con la identidad corporativa de SherpARQ
- ✅ **Protección NDA** - Rechaza preguntas sobre información confidencial
- ✅ **Manejo de errores** robusto
- ✅ **Integración con OpenAI API**

### Código del Worker

El código completo está en [`backend/src/index.js`](file:///home/fermaf/Dropbox/empresas/sherpARQ/codigo/backend/src/index.js)

**Características principales:**
```javascript
// Configuración LLM
model: "gpt-4.1-nano"
temperature: 0.3

// System Prompt
- Identidad: SherpARQ (entidad corporativa, no persona física)
- Expertise: Normativa DOM, seguridad minera, instalaciones industriales
- Protección: NDA estricto, no revela datos sensibles
- Tono: Corporativo, técnico, profesional
```

### Despliegue del Backend

```bash
cd /home/fermaf/Dropbox/empresas/sherpARQ/codigo/backend
wrangler deploy
```

### Configuración de Secrets

La API key de OpenAI debe estar configurada como secret:

```bash
cd /home/fermaf/Dropbox/empresas/sherpARQ/codigo/backend
wrangler secret put OPENAI_API_KEY
# Pega tu API key cuando se solicite
```

---

## 🔗 Integración Frontend-Backend

El componente [`ChatWidget.tsx`](file:///home/fermaf/Dropbox/empresas/sherpARQ/codigo/frontend/components/ChatWidget.tsx) está configurado para conectarse al Worker:

```typescript
// Llamada al Worker
const response = await fetch('https://sherparq-backend.abogado.workers.dev', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userMessage: text })
});

const data = await response.json();
const aiContent = data.choices?.[0]?.message?.content;
```

---

## 📋 Workflow de Desarrollo con Git

### Estructura de Ramas
- **`main`**: Rama principal de producción (despliega automáticamente a GitHub Pages)

### Flujo de Trabajo Diario

#### 1. Antes de Empezar a Trabajar
```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull origin main
```

#### 2. Hacer Cambios
```bash
# Edita los archivos necesarios
# Verifica los cambios
git status
git diff
```

#### 3. Commit de Cambios
```bash
# Agregar archivos específicos
git add components/ChatWidget.tsx
git add index.html

# O agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "Fix: Corrección en manejo de errores del chat"
```

#### 4. Desplegar a Producción
```bash
# Opción A: Script automatizado (hace build + push)
./deploy.sh "Descripción del cambio"

# Opción B: Manual
npm run build
git add dist/
git commit -m "Build: Actualización de producción"
git push origin main
```

### Comandos Git Útiles

```bash
# Ver historial de commits
git log --oneline -10

# Ver cambios no commiteados
git status
git diff

# Descartar cambios en un archivo
git restore archivo.tsx

# Ver ramas
git branch -a

# Revertir último commit (mantiene cambios)
git reset --soft HEAD~1

# Revertir último commit (descarta cambios)
git reset --hard HEAD~1
```

### Buenas Prácticas

✅ **Mensajes de Commit Claros:**
- `Fix: Corrección de bug en chat`
- `Feature: Nuevo componente de contacto`
- `Update: Actualización de estilos`
- `Docs: Actualización de README`

✅ **Commits Frecuentes:**
- Haz commits pequeños y frecuentes
- Cada commit debe representar un cambio lógico

✅ **Build Antes de Push:**
- Siempre verifica que `npm run build` funcione antes de hacer push

---

## 🧪 Testing

### Pruebas Locales del Chat

1. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Abrir en navegador:** `http://localhost:3000`

3. **Probar el chat:**
   - Click en el botón del chat (esquina inferior derecha)
   - Enviar mensaje de prueba
   - Verificar respuesta del LLM

4. **Verificar en consola:**
   - Abrir DevTools (F12)
   - Verificar que no haya errores CORS
   - Verificar que la respuesta venga del Worker

### Pruebas en Producción

Después de desplegar, visitar: `https://sherparq.github.io/frontend/`

**Casos de prueba:**
- ✅ Preguntar sobre servicios de SherpARQ → Respuesta técnica y profesional
- ✅ Preguntar sobre normativa DOM → Respuesta con autoridad técnica
- ✅ Preguntar información confidencial → Rechazo educado (protección NDA)
- ✅ Preguntar tema fuera del ámbito → Redirección amable

---

## 📁 Estructura del Proyecto

```
frontend/
├── components/
│   ├── ChatWidget.tsx       # Chat AI integrado con Worker
│   ├── Hero.tsx
│   ├── Services.tsx
│   └── ...
├── pages/
│   └── Home.tsx
├── assets/
├── dist/                    # Build de producción (generado)
├── index.html
├── index.tsx               # Entry point
├── App.tsx
├── vite.config.ts
├── package.json
├── deploy.sh               # Script de despliegue
└── README.md
```

---

## 🔧 Configuración Técnica

### vite.config.ts
```typescript
{
  base: '/frontend/',  // Para GitHub Pages
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
}
```

### package.json
```json
{
  "homepage": "https://sherparq.github.io/frontend"
}
```

---

## 📞 Contacto

**SherpARQ**  
Antofagasta, Chile  
sepulvedarq@gmail.com

---

## 📝 Notas Adicionales

> **Seguridad:** La API key de OpenAI está almacenada de forma segura en Cloudflare Workers como secret, nunca se expone en el frontend.

> **CORS:** El Worker solo acepta peticiones desde `https://sherparq.github.io` en producción.

> **Costos:** El modelo `gpt-4.1-nano` es económico y rápido, ideal para un chatbot corporativo.