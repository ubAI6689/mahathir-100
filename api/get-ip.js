export default function handler(request, response) {
    // Get IP from Vercel's headers
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    response.status(200).json({ ip })
  }