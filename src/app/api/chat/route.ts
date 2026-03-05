export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    }
  );

  const data = await response.json();
  return Response.json(data);
}

