# Chatbot Demo (Hono + Bun)

Este es un proyecto de demostración de un chatbot básico que utiliza Hono como framework web y Bun como runtime de JavaScript.

## Tecnologías Utilizadas

*   **Hono:** Un framework web rápido, ligero y con Edge.
*   **Bun:** Un runtime de JavaScript y toolkit todo en uno diseñado para la velocidad, que incluye un empaquetador, un transpilador y un gestor de paquetes.
*   **HTML, CSS, JavaScript:** Para la interfaz de usuario del lado del cliente.
*   **WebSockets:** Para la comunicación en tiempo real entre el cliente y el servidor.

## Características

*   Comunicación de chat en tiempo real.
*   Manejo de múltiples usuarios conectados.
*   Historial de mensajes (mientras el servidor esté activo).
*   Interfaz de usuario sencilla y reactiva.

## Configuración y Ejecución Local

Para ejecutar este proyecto localmente, asegúrate de tener Bun instalado.

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/bytequest-cl/chatbot-demoTICS413.git
    cd chatbot-demoTICS413
    ```

2.  **Instala las dependencias:**

    ```bash
    bun install
    ```

3.  **Inicia el servidor:**

    ```bash
    bun run dev
    ```

    El servidor se iniciará, probablemente en `http://localhost:3000` o un puerto similar.

4.  **Abre en el navegador:**
    Abre tu navegador web y navega a la dirección proporcionada por Bun. Abre múltiples pestañas para simular diferentes usuarios.

## Despliegue

Este proyecto está diseñado para ser desplegado en plataformas que soporten entornos Node.js o Bun, o que permitan la ejecución de aplicaciones a través de contenedores Docker. La configuración específica de despliegue dependerá de la plataforma elegida (por ejemplo, Vercel, Netlify, AWS, Azure, Google Cloud, Heroku, etc.).

---

**Nota:** Este es un proyecto de demostración y el historial de mensajes no es persistente; se perderá cuando el servidor se reinicie.
