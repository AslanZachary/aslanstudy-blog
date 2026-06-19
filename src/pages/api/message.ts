import type { APIRoute } from 'astro'
import { addMessage, getMessages } from '~/utils/storage'

export const GET: APIRoute = async () => {
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
