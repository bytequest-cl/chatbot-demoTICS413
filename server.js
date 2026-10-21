import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { Hono } from 'hono'
import { serve, upgradeWebSocket } from '@hono/node-server'
import { WebSocketServer } from 'ws'

const app = new Hono()
const clients = new Map()
const history = []
const HISTORY_LIMIT = 200
let nextUser = 1

function broadcast(data) {
  const payload = JSON.stringify(data)
  for (const ws of clients.values()) {
    if (ws.readyState === 1) ws.send(payload)
  }
}

function presence() {
  broadcast({ type: 'presence', count: clients.size })
}

app.get('/', async (c) => {
  const html = await readFile(fileURLToPath(new URL('./index.html', import.meta.url)), 'utf8')
  return c.html(html)
})

app.get('/ws', upgradeWebSocket(() => {
  const user = { id: crypto.randomUUID(), name: `Usuario ${nextUser++}` }
  return {
    onOpen(_event, ws) {
      clients.set(user.id, ws)
      ws.send(JSON.stringify({ type: 'welcome', user }))
      ws.send(JSON.stringify({ type: 'history', messages: history }))
      broadcast({ type: 'system', content: `${user.name} se unió al chat.` })
      presence()
    },
    onMessage(event, ws) {
      try {
        if (typeof event.data !== 'string') throw new Error('Envía texto.')
        const data = JSON.parse(event.data)
        if (typeof data?.content !== 'string' || !data.content.trim() || data.content.length > 4000) {
          throw new Error('Escribe entre 1 y 4000 caracteres.')
        }
        const message = { type: 'message', user, content: data.content.trim() }
        history.push(message)
        if (history.length > HISTORY_LIMIT) history.shift()
        broadcast(message)
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', content: error instanceof Error ? error.message : 'Mensaje inválido.' }))
      }
    },
    onClose() {
      if (clients.delete(user.id)) {
        broadcast({ type: 'system', content: `${user.name} salió del chat.` })
        presence()
      }
    },
  }
}))

const websocketServer = new WebSocketServer({ noServer: true })
const port = Number(process.env.PORT ?? 3047)
serve({ fetch: app.fetch, port, hostname: '0.0.0.0', websocket: { server: websocketServer } })
console.log(`Chat listo en el puerto ${port}`)
