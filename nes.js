addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Chỉ proxy khi truy cập đường dẫn bắt đầu bằng /vn
  if (url.pathname.startsWith('/vn')) {
    const path = url.pathname.replace('/vn', '')
    const target = 'https://nes-dev.jacobins-digital.com' + path + url.search

    const proxyRequest = new Request(target, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })

    return fetch(proxyRequest)
  }

  return new Response('404 Not Found', { status: 404 })
}

