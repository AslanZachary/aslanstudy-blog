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
  parentId?: string
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

function collectDescendantIds(all: Message[], rootId: string): Set<string> {
  const ids = new Set<string>([rootId])
  let added = true
  while (added) {
    added = false
    for (const m of all) {
      if (m.parentId && ids.has(m.parentId) && !ids.has(m.id)) {
        ids.add(m.id)
        added = true
      }
    }
  }
  return ids
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
    const all = await kvGetAll<Message>('messages')
    const toDelete = collectDescendantIds(all, id)
    const filtered = all.filter(m => !toDelete.has(m.id))
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
  const toDelete = collectDescendantIds(memoryStore.messages as Message[], id)
  if (toDelete.size === 0) return false
  const prevLen = memoryStore.messages.length
  memoryStore.messages = memoryStore.messages.filter((m: any) => !toDelete.has(m.id))
  return memoryStore.messages.length < prevLen
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
