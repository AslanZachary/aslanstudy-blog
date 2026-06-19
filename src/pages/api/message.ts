import type { APIRoute } from 'astro'
import { addMessage, getMessages, deleteMessage } from '~/utils/storage'

export const prerender = false

const ADMIN_KEY = import.meta.env.ADMIN_KEY || 'admin123'

function isAdmin(request: Request): boolean {
  const url = new URL(request.url)
  const key = url.searchParams.get('key') || request.headers.get('x-admin-key') || ''
  return key === ADMIN_KEY
}

// GET — public messages (no auth needed)
export const GET: APIRoute = async ({ request }) => {
  // If admin key present, return ALL messages
  if (isAdmin(request)) {
    try {
      const all = await getMessages()
      all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return new Response(JSON.stringify(all), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Public only
  try {
    const all = await getMessages()
    const publicMessages = all
      .filter(m => m.public === true)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(({ id, name, message, createdAt }) => ({ id, name, message, createdAt }))

    return new Response(JSON.stringify(publicMessages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error fetching messages:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// DELETE — admin only
export const DELETE: APIRoute = async ({ request }) => {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const deleted = await deleteMessage(id)
  return new Response(JSON.stringify({ success: deleted }), {
    status: deleted ? 200 : 404,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { name, contact, message, type, public: isPublic } = body as {
      name?: string
      contact?: string
      message?: string
      type?: string
      public?: boolean
    }

    if (!message || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const msg = await addMessage({
      type: (type === 'comment' ? 'comment' : 'message') as 'message' | 'comment',
      name: name || 'Anonymous',
      contact: contact || '',
      message: message.trim(),
      public: isPublic === true,
    })

    return new Response(JSON.stringify({ success: true, id: msg.id, public: msg.public }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error saving message:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
