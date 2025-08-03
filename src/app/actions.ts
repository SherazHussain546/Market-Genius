"use server";

import {
  generateSignalContext,
  type GenerateSignalContextOutput,
  type GenerateSignalContextInput,
} from "@/ai/flows/generate-signal-context";

export async function getSignalContextAction(
  ticker: string
): Promise<GenerateSignalContextOutput | { error: string }> {
  try {
    const input: GenerateSignalContextInput = { ticker };
    const result = await generateSignalContext(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate context. Please try again." };
  }
}
