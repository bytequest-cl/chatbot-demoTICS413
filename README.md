# Chat compartido con Hono y Bun

Chat en tiempo real con WebSockets. Cada pestaña conectada recibe un usuario distinto; los mensajes se comparten con todos los conectados y las nuevas conexiones reciben los últimos 200 mensajes.

## Ejecutar localmente

Necesitas [Bun](https://bun.sh/).

```bash
bun install
bun run dev
```

Abre `http://localhost:3047` en varias pestañas para probar la sala. Puedes cambiar el puerto con la variable `PORT`.

## Construir y ejecutar con Docker

```bash
docker build -t chatbot-demo .
docker run --rm -p 8080:8080 chatbot-demo
```

Abre `http://localhost:8080`.

## Azure App Service

El repositorio incluye un `Dockerfile` para desplegar como contenedor Linux:

1. Crea un Azure Container Registry (ACR) y una Web App for Containers en App Service.
2. Configura App Service para usar el puerto del contenedor `8080` (en configuración clásica, define `WEBSITES_PORT=8080`).
3. Conecta el repositorio de GitHub desde Deployment Center y configura el flujo para construir la imagen del `Dockerfile`, publicarla en ACR y desplegarla en la Web App.
4. Habilita WebSockets en la configuración de la Web App.

La aplicación escucha en `0.0.0.0` y toma el puerto de `PORT`, por lo que funciona dentro del contenedor y usa WebSocket seguro (`wss://`) detrás de HTTPS.

## Alcance de la demo

El historial y la lista de usuarios viven en la memoria del proceso. Se conservan hasta 200 mensajes, pero se pierden al reiniciar la aplicación. Para esta demo usa una sola instancia de App Service: varias instancias tendrían historiales y usuarios separados.
