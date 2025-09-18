// functions/hello.js


export default function handler(request, response) {
    console.log("Users request:", request);
    response.status(200).json({
  
      body: request.body,
  
      query: request.query,
  
      cookies: request.cookies,
  
    });
  
  }
  