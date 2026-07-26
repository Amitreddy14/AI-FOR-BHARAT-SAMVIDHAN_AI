export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`Chat API failed: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ reply: "क्षमा करें, कुछ तकनीकी समस्या हुई है। कृपया फिर कोशिश करें / Sorry, technical issue. Please try again." });
  }
}

