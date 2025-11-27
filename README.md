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

## Parte 1: Frontend (GitHub Pages)

### Tecnologías
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

### Despliegue en GitHub Pages

1. **Repositorio:**
   Crea un repositorio en GitHub (ej: `sherparq-web`) y sube todos los archivos de este proyecto.

2. **Configuración de Build:**
   Si usas Vite (recomendado):
   ```bash
   npm install
   npm run build
   ```
   Asegúrate de que `package.json` tenga `"homepage": "https://TU_USUARIO.github.io/sherparq-web"`.

3. **Publicación:**
   Usa la acción de GitHub Pages o despliega manualmente la carpeta `dist` (o `build`) a la rama `gh-pages`.

## Parte 2: Backend AI (Cloudflare Workers)

El chat "SherpBot" requiere un backend serverless para procesar las peticiones de manera segura y conectar con la API de IA (ej: OpenAI o Anthropic).

### Código del Worker (`worker.js`)

Crea un nuevo Cloudflare Worker y pega el siguiente código:

```javascript
export default {
  async fetch(request, env) {
    // 1. Manejo de CORS (Permitir peticiones desde tu GitHub Page)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Cambiar "*" por tu URL de GitHub Pages en producción
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { message } = await request.json();

      // 2. Aquí conectas con tu proveedor de IA (Ejemplo con OpenAI)
      // Asegúrate de configurar OPENAI_API_KEY en las variables de entorno del Worker
      
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Eres SherpBot, el asistente virtual de SherpARQ, una empresa de ingeniería y arquitectura industrial en Chile. Tu tono es profesional, técnico y conciso. Responde preguntas sobre gestión de permisos, arquitectura industrial, modelado 3D y seguridad. Si no sabes algo, sugiere contactar a contacto@sherparq.cl."
          },
          { role: "user", content: message }
        ]
      };

      const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const data = await aiResponse.json();
      const reply = data.choices[0].message.content;

      // 3. Respuesta al Frontend
      return new Response(JSON.stringify({ reply }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};
```

### Configuración Final
1. En el archivo `components/ChatWidget.tsx` del frontend, busca la función `handleSend` y descomenta la llamada `fetch`, reemplazando la URL por la de tu Worker publicado.
2. En Cloudflare Dashboard, añade la variable de entorno `OPENAI_API_KEY`.

## Contacto
**SherpARQ**
Antofagasta, Chile
contacto@sherparq.cl
```