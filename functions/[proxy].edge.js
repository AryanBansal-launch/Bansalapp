// // edge function for redirection demonstration, the url is not re-written, the page that is rendered is of /contact but url is also re-written to /contact instead of /test
// export default async function handler(request) {
//   const modifiedUrl = new URL(request.url);
//   const route = modifiedUrl.pathname;
//   if (route === "/skills" && request.method === "GET") {
//     modifiedUrl.pathname = "/contact";
//     return Response.redirect(modifiedUrl, 301);
//   }
//   return fetch(request);
// }
const RSC_REDIRECT_PATHS = [
  '/contact'
];
const RSC_HEADER = 'rsc';
const RSC_HEADER_VALUE = '1';
const RSC_QUERY_PARAM = 'rsc';

export default function handler(request) {
  const parsedUrl = new URL(request.url);
  const route = parsedUrl.pathname;
  const rscQueryParamExists = !!parsedUrl.searchParams.get(RSC_QUERY_PARAM);
  const rscHeaderExists = request.headers.get(RSC_HEADER) === RSC_HEADER_VALUE;
  const isRscRedirectPath = RSC_REDIRECT_PATHS.indexOf(route) > -1;

  if (isRscRedirectPath && !rscQueryParamExists && rscHeaderExists) {
      const modifiedRequest = new Request(request);
      modifiedRequest.headers.delete(RSC_HEADER);
      return fetch(modifiedRequest);
  }
  return fetch(request);
}