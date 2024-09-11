import {
  type classProgramFormSchema,
  classProgramResponseSchema,
} from "@/classProgramSchema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { ollama } from "ollama-ai-provider";
import type { z } from "zod";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const prompt = res.prompt as z.infer<typeof classProgramFormSchema>;

    const { object } = await generateObject({
      // model: ollama("llama3.1"),
      model: google("gemini-1.5-flash", { structuredOutputs: true }),
      schema: classProgramResponseSchema,
      prompt: `A ${prompt.subject} study plan that helps ${prompt.targetAudience} meet the goal of ${prompt.objective} for a duration of ${prompt.duration} ${prompt.durationUnit}`,
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
