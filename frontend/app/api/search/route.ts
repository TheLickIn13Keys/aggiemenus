import { NextRequest, NextResponse } from "next/server";
import supabase from "../supabase";
import { OpenAI } from "openai";

// Test API functionality
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "ok" });
}

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: "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",
  });
  const body = await req.json();
  if (body["search"]) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: body["search"],
    });
    console.log(embedding.data[0].embedding);
    let { data, error } = await supabase.rpc("match_items", {
      match_count: 30,
      query_embedding: embedding.data[0].embedding,
      similarity_threshold: 0.8,
    });
    if (error) console.error(error);
    else console.log(data);
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Please enter valid parameters" },
      { status: 400 }
    );
  }
}
