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

      // Transform the data to add the missing fields
      const transformedData = data?.map(item => ({
        ...item,
        common_items: {
          ...item.common_items,
          // Add missing fields with computed values based on allergens
          dairyFree: !item.common_items.allergens.some((allergen: string) => 
            allergen.toLowerCase().includes('dairy')),
          glutenFree: !item.common_items.allergens.some((allergen: string) => 
            allergen.toLowerCase().includes('gluten') || 
            allergen.toLowerCase().includes('wheat')),
          pescetarian: item.common_items.vegan || 
                      item.common_items.vegetarian ||
                      item.common_items.allergens.some((allergen: string) => 
                        allergen.toLowerCase().includes('fish') || 
                        allergen.toLowerCase().includes('shellfish'))
        }
      }));

      return NextResponse.json(transformedData, { status: 200 });
    } catch (error: any) {
      console.error("API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
}
