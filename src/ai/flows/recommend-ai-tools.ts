'use server';
/**
 * @fileOverview This file implements a Genkit flow for personalized AI tool recommendations.
 * It takes a user's viewing history and interests as input and provides a list of
 * recommended AI tools.
 *
 * - recommendAiTools - A function that handles the AI tool recommendation process.
 * - RecommendAiToolsInput - The input type for the recommendAiTools function.
 * - RecommendAiToolsOutput - The return type for the recommendAiTools function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendAiToolsInputSchema = z.object({
  viewingHistory: z.array(z.string())
    .describe("A list of names or IDs of AI tools the user has recently viewed or interacted with. Can be empty if no history is available."),
  interests: z.array(z.string())
    .describe("A list of user-expressed interests, e.g., 'image generation', 'coding', 'writing assistant'. Can be empty if no interests are specified."),
});
export type RecommendAiToolsInput = z.infer<typeof RecommendAiToolsInputSchema>;

const RecommendedToolSchema = z.object({
  id: z.string().describe("A unique identifier for the recommended AI tool (e.g., a slug or internal ID)."),
  name: z.string().describe("The name of the recommended AI tool."),
  description: z.string().describe("A brief description of what the AI tool does and why it's relevant."),
  category: z.string().describe("The primary category of the AI tool (e.g., 'Image Generation', 'Coding', 'Writing Assistant')."),
});

const RecommendAiToolsOutputSchema = z.object({
  recommendations: z.array(RecommendedToolSchema)
    .describe("An array of up to 5 recommended AI tools, each with an ID, name, description, and category."),
});
export type RecommendAiToolsOutput = z.infer<typeof RecommendAiToolsOutputSchema>;

export async function recommendAiTools(input: RecommendAiToolsInput): Promise<RecommendAiToolsOutput> {
  return recommendAiToolsFlow(input);
}

const recommendAiToolsPrompt = ai.definePrompt({
  name: 'recommendAiToolsPrompt',
  input: { schema: RecommendAiToolsInputSchema },
  output: { schema: RecommendAiToolsOutputSchema },
  prompt: `You are an expert AI tool recommender for the "AI Hub" platform. Your goal is to provide personalized AI tool recommendations based on the user's viewing history and expressed interests.

Based on the provided information, suggest up to 5 AI tools that would be highly relevant and beneficial to the user. For each recommendation, provide its name, a brief description, and its primary category.

If the viewing history or interests are empty, provide general, popular, or innovative AI tool recommendations across different categories such as writing, image generation, coding, or productivity.

User Viewing History (if available):
{{#if viewingHistory}}
{{{viewingHistory}}}
{{else}}
No recent viewing history provided.
{{/if}}

User Interests (if available):
{{#if interests}}
{{{interests}}}
{{else}}
No specific interests provided.
{{/if}}

Provide your recommendations as a JSON array of objects, strictly following the output schema.
`,
});

const recommendAiToolsFlow = ai.defineFlow(
  {
    name: 'recommendAiToolsFlow',
    inputSchema: RecommendAiToolsInputSchema,
    outputSchema: RecommendAiToolsOutputSchema,
  },
  async (input) => {
    const { output } = await recommendAiToolsPrompt(input);
    // Genkit 1.x output is directly the parsed schema result or null.
    // We expect a valid output based on the prompt's instruction to strictly follow the schema.
    return output!;
  }
);
