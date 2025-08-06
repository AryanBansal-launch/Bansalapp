//edge fucntion to fix the RSC issue
export default async function handler(request) {
  const parsedUrl = new URL(request.url);
  const route = parsedUrl.pathname;
  
  // Conditionally call functions based on route or other conditions
  if (route === '/example') {
    return await example_edge_function(request);
  }
  else{
    return await rsc_edge_function(request);
  }
}


//1. Edge function to fix the RSC issue
const rsc_edge_function = async (request) => {
  const RSC_REDIRECT_PATHS = [
    '/about','/projects','/skills'
  ];
  const RSC_HEADER = 'Rsc';
  const RSC_HEADER_VALUE = '1';
  const RSC_QUERY_PARAM = 'rsc';
    console.log("This is an edge functions test");
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

  //2. Edge function to handle the example route
  const example_edge_function = async (request) => {
    const parsedUrl = new URL(request.url);
    const route = parsedUrl.pathname;
    if (route === '/example') {
      const response = {
        time: new Date()
      }
      return new Response(JSON.stringify(response))
    }
    return fetch(request)
   }

