// export default async function handler(request, context) {
//   try {
//     const parsedUrl = new URL(request.url);
//     const route = parsedUrl.pathname;
//     console.log(route);
//     if (route === "/test" && request.method === "GET") {
//       return fetch(
//         `https://www.contentstack.com/docs/developers/launch/edge-functions#handling-routes-at-edge`
//       );
//     }
//     return fetch(request);
//   } catch (error) {
//     console.log(error);
//   }
// }

export default async function handler(request) {
    const modifiedUrl = new URL(request.url);
    const route = modifiedUrl.pathname;
    if (route === '/test' && request.method === 'GET') {
      modifiedUrl.pathname = '/contact';
      return Response.redirect(modifiedUrl, 301)
    }
    return fetch(request);
   }
   