export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
<<<<<<< HEAD
    `${process.env.NEXT_PUBLIC_API_URL}/chat`,
=======
    "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/chat",
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
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

