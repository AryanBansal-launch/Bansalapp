export default function handler(request: string | URL | Request) {
    let parsedUrl;
    if (typeof request === 'string') {
        parsedUrl = new URL(request);
    } else if (request instanceof URL) {
        parsedUrl = request;
    } else {
        parsedUrl = new URL(request.url);
    }
    const route = parsedUrl.pathname;
    if (route === '/test' && request instanceof Request && request.method === 'GET') {
     return fetch(`https://nextjs.org/docs/messages/prerender-error`);
    }
    return fetch(request)
   }
   