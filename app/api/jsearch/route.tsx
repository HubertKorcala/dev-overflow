import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  let query = searchParams?.get("query")
    ? searchParams.get("query")
    : "next.js";
  const page = searchParams?.get("page") ? searchParams.get("page") : 1;
  let country = searchParams?.get("country") ? searchParams.get("country") : "";
  if (country) {
    country = encodeURIComponent(` in ${country}`);
  }
  if (!query) {
    query = "next.js";
  }

  const encodedQuery = encodeURIComponent(query);

  const url = `https://jsearch.p.rapidapi.com/search?query=${
    encodedQuery + country
  }&page=${page}&num_pages=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.X_RAPID_API_KEY}`,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const responseData = await response.json();

    const data = responseData.data;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
