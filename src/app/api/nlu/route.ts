export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch(
<<<<<<< HEAD
      `${process.env.NEXT_PUBLIC_API_URL}/nlu`,
=======
      "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/nlu",
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
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