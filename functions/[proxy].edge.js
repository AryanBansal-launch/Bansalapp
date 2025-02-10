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
export default {
    async fetch(request, context) {
      try {
        const parsedUrl = new URL(request.url);
        const route = parsedUrl.pathname;
  
        console.log(route); // Log the requested route
  
        if (route === "/test" && request.method === "GET") {
          return await fetch(
            "https://www.contentstack.com/docs/developers/launch/edge-functions#handling-routes-at-edge"
          );
        }
  
        return await fetch(request);
      } catch (error) {
        console.error("Error handling request:", error);
  
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  };
  