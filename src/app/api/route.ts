import { classProgramResponseSchema } from "@/classProgramSchema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { ollama } from "ollama-ai-provider";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const { object } = await generateObject({
      // model: ollama("llama3.1"),
      model: google("gemini-1.5-flash", { structuredOutputs: true }),
      schema: classProgramResponseSchema,
      prompt: `a properly structured class program on ${prompt}`,
    });

    return NextResponse.json(object);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error generating class program.",
      },
      {
        status: 500,
      }
    );
  }
}
