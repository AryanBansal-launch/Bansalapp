export default async function handler(request) {
  const modifiedUrl = new URL(request.url);
  const route = modifiedUrl.pathname;
  if (route === "/test" && request.method === "GET") {
    modifiedUrl.pathname = "/contact";
    return Response.redirect(modifiedUrl, 301);
  }
  return fetch(request);
}
