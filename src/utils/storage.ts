/**
 * Storage utility using Vercel Blob.
 * Messages and subscribers are persisted as JSON files in Blob storage.
 *
 * The blob store public base URL (aslanstudy-blog-public-blob):
 *   https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com
 */

import { put } from '@vercel/blob'

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

const BLOB_BASE = 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com'
const MESSAGES_PATH = 'data/messages.json'
const SUBSCRIBERS_PATH = 'data/subscribers.json'

async function blobGetAll<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${BLOB_BASE}/${path}`, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()) as T[]
  } catch {
    return []
  }
}

async function blobSetAll<T>(path: string, data: T[]): Promise<void> {
  try {
    await put(path, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
  } catch (err) {
    console.error(`blobSetAll(${path}) failed:`, err)
    throw err
  }
}

export async function addMessage(data: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
  const msg: Message = { ...data, id: uid(), createdAt: new Date().toISOString() }
  const all = await blobGetAll<Message>(MESSAGES_PATH)
  all.push(msg)
  await blobSetAll(MESSAGES_PATH, all)
  return msg
}

export async function getMessages(): Promise<Message[]> {
  return await blobGetAll<Message>(MESSAGES_PATH)
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
  const all = await blobGetAll<Message>(MESSAGES_PATH)
  const toDelete = collectDescendantIds(all, id)
  const filtered = all.filter(m => !toDelete.has(m.id))
  if (filtered.length === all.length) return false
  await blobSetAll(MESSAGES_PATH, filtered)
  return true
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  const all = await blobGetAll<Subscriber>(SUBSCRIBERS_PATH)
  if (all.find(s => s.email === email)) {
    return { email, subscribedAt: new Date().toISOString() }
  }
  const sub: Subscriber = { email, subscribedAt: new Date().toISOString() }
  all.push(sub)
  await blobSetAll(SUBSCRIBERS_PATH, all)
  return sub
}
