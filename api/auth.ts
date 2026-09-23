function textResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function isValidKey(key: string | null) {
  const expectedKey = process.env.LICENSE
  return Boolean(expectedKey) && key === expectedKey
}

export function GET(request: Request) {
  const key = new URL(request.url).searchParams.get('key')
  if (key === null) {
    return new Response(null, { status: 307, headers: { Location: '/404' } })
  }
  if (!key) {
    return textResponse('missing license', 400)
  }
  return isValidKey(key) ? textResponse('soon', 200) : textResponse('invalid license', 401)
}
