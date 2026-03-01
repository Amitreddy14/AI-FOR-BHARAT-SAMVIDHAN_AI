export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let url = "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/schemes";

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