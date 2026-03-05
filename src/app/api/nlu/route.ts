export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/nlu`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      }
    );

    if (!res.ok) {
      throw new Error("NLU service failed");
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    console.error("NLU route error:", error);

    return Response.json({
      intent: "unknown",
      schemeId: null
    });
  }
}