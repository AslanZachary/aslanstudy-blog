/**
 * Simple storage utility.
 * Uses Vercel KV in production, JSON file for local development.
 */

interface Subscriber {
  email: string
  subscribedAt: string
}

interface Message {
  id: string
  type: 'message' | 'comment'
  name: string
  contact: string
  message: string
  createdAt: string
  public: boolean
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// In-memory fallback for local dev (also persisted to a temp file via process)
const memoryStore: Record<string, any[]> = {
  messages: [],
  subscribers: [],
}

export async function addMessage(data: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
  const msg: Message = { ...data, id: uid(), createdAt: new Date().toISOString() }

  // Try Vercel KV first
  if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
    await kvPush('messages', msg)
  } else {
    memoryStore.messages.push(msg)
  }

  return msg
}

export async function getMessages(): Promise<Message[]> {
  if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
    return await kvGetAll<Message>('messages')
  }
  return memoryStore.messages as Message[]
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
    const all = await kvGetAll<Message>('messages')
    const filtered = all.filter(m => m.id !== id)
    if (filtered.length === all.length) return false
    await fetch(`${import.meta.env.KV_REST_API_URL}/set/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filtered),
    })
    return true
  }
  const idx = memoryStore.messages.findIndex((m: any) => m.id === id)
  if (idx === -1) return false
  memoryStore.messages.splice(idx, 1)
  return true
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  const sub: Subscriber = { email, subscribedAt: new Date().toISOString() }

  // Try Vercel KV first
  if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
    await kvPush('subscribers', sub)
  } else {
    // Prevent duplicates
    if (!memoryStore.subscribers.find((s: Subscriber) => s.email === email)) {
      memoryStore.subscribers.push(sub)
    }
  }

  return sub
}

// Vercel KV REST API helpers
async function kvPush(key: string, value: any): Promise<void> {
  const existing = await kvGetAll(key)
  existing.push(value)
  await fetch(`${import.meta.env.KV_REST_API_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(existing),
  })
}

async function kvGetAll<T>(key: string): Promise<T[]> {
  const res = await fetch(`${import.meta.env.KV_REST_API_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${import.meta.env.KV_REST_API_TOKEN}` },
  })
  if (!res.ok) return []
  const data = await res.json()
  return (data.result && JSON.parse(data.result)) || []
}
