export default async function handler (request,context) {
    const parsedUrl = new URL(request.url);
    const route = parsedUrl.pathname;
    console.log(route);
    if (route === '/test' && request.method === 'GET') {
     return await fetch(`https://www.contentstack.com/docs/developers/launch/edge-functions#handling-routes-at-edge`);
    }
    return await fetch(request)
   }

  