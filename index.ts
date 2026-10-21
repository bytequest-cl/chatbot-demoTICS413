import { Hono } from 'hono'
import { upgradeWebSocket, websocket } from '@hono/bun'
import type { WSContext } from 'hono/ws'

const app = new Hono()
const clients = new Map<string, WSContext>()
type ChatMessage = {
  type: 'message'
  user: { id: string; name: string }
  content: string
}
const history: ChatMessage[] = []
const HISTORY_LIMIT = 200
let nextUser = 1

function broadcast(data: unknown) {
  const payload = JSON.stringify(data)
  for (const ws of clients.values()) {
    if (ws.readyState === 1) ws.send(payload)
  }
}
function presence() {
  broadcast({ type: 'presence', count: clients.size })
}

app.get('/', () => new Response(Bun.file(import.meta.dir + '/index.html')))
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
        if (typeof data?.content !== 'string' || !data.content.trim() || data.content.length > 4000) throw new Error('Escribe entre 1 y 4000 caracteres.')
        const message: ChatMessage = { type: 'message', user, content: data.content.trim() }
        history.push(message)
        if (history.length > HISTORY_LIMIT) history.shift()
        broadcast(message)
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', content: error instanceof Error ? error.message : 'Mensaje inválido.' }))
      }
    },
    onClose(_event, ws) {
      if (clients.delete(user.id)) {
        broadcast({ type: 'system', content: `${user.name} salió del chat.` })
        presence()
      }
    },
  }
}))
export default { hostname: '127.0.0.1', port: 3047, fetch: app.fetch, websocket }
