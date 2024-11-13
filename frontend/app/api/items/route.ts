import { NextRequest, NextResponse } from "next/server";
import supabase from "../supabase";

// Test API functionality
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "ok" });
}

// We use a POST request so that we can include the query parameters in the body
export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Current Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Request body:", body);

  if (body["dc"] && body["day"] && body["meal"]) {
    try {
      const { data, error } = await supabase
        .from("current_menu")
        .select(`*, common_items(*)`)
        .eq("dc", body["dc"])
        .eq("day", body["day"])
        .eq("meal", body["meal"]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.error("API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
}
