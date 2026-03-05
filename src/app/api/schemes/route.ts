export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

<<<<<<< HEAD
  let url = `${process.env.NEXT_PUBLIC_API_URL}/schemes`;
=======
  let url = "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/schemes";
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e

  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();
  return Response.json(data);
}