# Chat compartido con Hono y Node.js

Chat en tiempo real con WebSockets. Cada pestaña conectada recibe un usuario distinto; todos ven los mensajes y las nuevas conexiones reciben los últimos 200 mensajes.

## Ejecutar localmente

Necesitas Node.js 22 o superior.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3047` en varias pestañas. Puedes cambiar el puerto con la variable `PORT`.

## Construir la imagen Docker

```bash
docker build -t chatbot-demo:latest .
docker run --rm -p 8080:8080 chatbot-demo:latest
```

Abre `http://localhost:8080`.

## Azure App Service desde GitHub

1. Crea una Web App en App Service y elige **Publicar: Contenedor**, **Linux**.
2. En **Deployment Center**, selecciona **GitHub Actions** y conecta el repositorio `bytequest-cl/chatbot-demoTICS413`, rama `main`.
3. Selecciona o crea un Azure Container Registry (ACR) y revisa el workflow que Azure propone. Debe construir el `Dockerfile`, publicar la imagen en ACR y desplegarla en App Service.
4. Configura el puerto del contenedor como `8080` (en configuración clásica, `WEBSITES_PORT=8080`).
5. Cuando termine GitHub Actions, abre la URL HTTPS de la Web App. El chat conecta por WebSocket seguro automáticamente.

## Notas

- App Service Linux admite WebSockets.
- El historial y los usuarios viven en memoria; se pierden al reiniciar. Usa una sola instancia para que todos compartan la sala.
- La llave privada RSA está excluida del contexto de Docker.
