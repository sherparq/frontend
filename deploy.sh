#!/bin/bash

# Script de despliegue para GitHub Pages (desde rama main)
# Uso: ./deploy.sh "mensaje de commit opcional"

set -e  # Detener si hay errores

echo "🚀 Iniciando despliegue a GitHub Pages..."

# 1. Verificar que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Debes estar en la rama 'main' para desplegar"
    exit 1
fi

# 2. Build de producción
echo "🔨 Generando build de producción..."
npm run build

# 3. Hacer commit de los cambios (incluyendo docs/)
COMMIT_MSG="${1:-Update: Integración con Cloudflare Worker}"
echo "📝 Haciendo commit de cambios..."
git add .
git commit -m "$COMMIT_MSG" || echo "ℹ️  No hay cambios para commitear"

# 4. Push a main (GitHub Pages despliega desde main)
echo "⬆️  Subiendo cambios a origin/main..."
git push origin main

echo "✅ ¡Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://sherparq.github.io/frontend/"
echo ""
echo "⏳ Nota: GitHub Pages puede tardar 1-2 minutos en actualizar"
