import type { APIRoute } from 'astro'
import { addMessage } from '~/utils/storage'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { name, contact, message, type } = body as {
      name?: string
      contact?: string
      message?: string
      type?: string
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
    })

    return new Response(JSON.stringify({ success: true, id: msg.id }), {
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
