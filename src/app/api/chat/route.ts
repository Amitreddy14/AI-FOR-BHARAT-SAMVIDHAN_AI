export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
    "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/chat",
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

