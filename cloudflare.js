
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes('application/text')) {
    return response.text();
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    return response.text();
  }
}

async function handleRequest(request) {
	const { searchParams } = new URL(request.url)
    let host = searchParams.get('url')
  const init = {
    headers: {
     'content-type': 'application/json',
	 'access-control-allow-origin': '*',
    },
  };
const response = await fetch(host, init);
const results = await gatherResponse(response);
return new Response(results, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
