import type { APIRoute } from 'astro'

function sanitize(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() as { name?: string; email?: string; message?: string }
  const { name, email, message } = body

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@federicoperalta.com>',
        to: 'peralta.federico.manuel@gmail.com',
        reply_to: email,
        subject: `New contact from ${sanitize(name)}`,
        html: `<p><strong>From:</strong> ${sanitize(name)} (${sanitize(email)})</p><p><strong>Message:</strong></p><p>${sanitize(message)}</p>`,
      }),
    })

    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Failed to send' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
