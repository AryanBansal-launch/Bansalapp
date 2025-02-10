export default function handler(request) {
    const parsedUrl = new URL(request.url);
    const route = parsedUrl.pathname;
    if (route === '/test' && request.method === 'GET') {
     return fetch(`https://www.contentstack.com/docs/developers/launch/edge-functions#handling-routes-at-edge`);
    }
    return fetch(request)
   }
   