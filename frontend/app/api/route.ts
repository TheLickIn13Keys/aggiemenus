import { NextRequest } from "next/server";
import supabase from "./supabase";

interface Props {
  dc: string;
  day: number;
  meal: string;
}

export async function GET(request: NextRequest, { dc, day, meal }: Props) {
  // Get URL from request
  // const url = new URL(request.url);

  // Extract data from url
  // const dc = url.searchParams.get("dc");
  // const day = url.searchParams.get("day");
  // const meal = url.searchParams.get("meal");

  // Make sure that parameters exist
  if (dc && day && meal) {
    // Get data from supabase
    try {
      const { data, error } = await supabase
        .from("food_items")
        .select("*")
        .eq("dc", dc)
        .eq("date", day)
        .eq("meal", meal);

      if (error) {
        throw new Error(error.message);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // Otherwise, tell the user we are missing the appropriate parameters
  else {
    return new Response(
      JSON.stringify({ error: "Missing appropriate parameters" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
