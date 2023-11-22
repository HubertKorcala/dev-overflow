import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,flags,cca2`
    );

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
};
