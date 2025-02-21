// // edge function for redirection demonstration, the url is not re-written, the page that is rendered is of /contact but url is also re-written to /contact instead of /test
// export default async function handler(request) {
//   const modifiedUrl = new URL(request.url);
//   const route = modifiedUrl.pathname;
//   if (route === "/test" && request.method === "GET") {
//     modifiedUrl.pathname = "/contact";
//     return Response.redirect(modifiedUrl, 301);
//   }
//   return fetch(request);
// }
