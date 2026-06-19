import type { APIRoute } from 'astro'
import { addSubscriber } from '~/utils/storage'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { email } = body as { email?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const sub = await addSubscriber(email.trim().toLowerCase())

    return new Response(JSON.stringify({ success: true, email: sub.email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error saving subscription:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
