/**
 * Storage utility using Vercel Blob.
 * Messages and subscribers are persisted as JSON files in Blob storage.
 */

import { put, list, del } from '@vercel/blob'

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

const MESSAGES_KEY = 'data/messages.json'
const SUBSCRIBERS_KEY = 'data/subscribers.json'

async function blobGetAll<T>(key: string): Promise<T[]> {
  try {
    const { blobs } = await list({ prefix: key, limit: 1 })
    const found = blobs.find(b => b.pathname === key)
    if (!found) return []
    const res = await fetch(found.url)
    if (!res.ok) return []
    return (await res.json()) as T[]
  } catch {
    return []
  }
}

async function blobSetAll<T>(key: string, data: T[]): Promise<void> {
  await put(key, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
  })
}

export async function addMessage(data: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
  const msg: Message = { ...data, id: uid(), createdAt: new Date().toISOString() }
  const all = await blobGetAll<Message>(MESSAGES_KEY)
  all.push(msg)
  await blobSetAll(MESSAGES_KEY, all)
  return msg
}

export async function getMessages(): Promise<Message[]> {
  return await blobGetAll<Message>(MESSAGES_KEY)
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
  const all = await blobGetAll<Message>(MESSAGES_KEY)
  const toDelete = collectDescendantIds(all, id)
  const filtered = all.filter(m => !toDelete.has(m.id))
  if (filtered.length === all.length) return false
  await blobSetAll(MESSAGES_KEY, filtered)
  return true
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  const all = await blobGetAll<Subscriber>(SUBSCRIBERS_KEY)
  if (all.find(s => s.email === email)) {
    return { email, subscribedAt: new Date().toISOString() }
  }
  const sub: Subscriber = { email, subscribedAt: new Date().toISOString() }
  all.push(sub)
  await blobSetAll(SUBSCRIBERS_KEY, all)
  return sub
}
