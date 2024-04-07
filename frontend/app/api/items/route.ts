import { NextRequest, NextResponse } from "next/server";
import supabase from "../supabase";

// Test API functionality
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "ok" });
}

// We use a POST request so that we can include the query parameters in the body
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body["dc"] && body["day"] && body["meal"]) {
    // Get data from supabase
    try {
      const { data, error } = await supabase
        .from("current_menu")
        .select(`*, common_items ( * )`)
        .eq("dc", body["dc"])
        .eq("day", body["day"])
        .eq("meal", body["meal"]);

      if (error) {
        throw new Error(error.message);
      }

      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.body }, { status: 500 });
    }
  }

  // Otherwise, tell the user we are missing the appropriate parameters
  else {
    return NextResponse.json(
      { error: "Please enter valid parameters" },
      { status: 400 }
    );
  }
}
