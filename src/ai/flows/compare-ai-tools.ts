'use server';
/**
 * @fileOverview An AI agent that compares multiple AI tools and generates a detailed report.
 *
 * - compareAiTools - A function that handles the AI tool comparison process.
 * - CompareAiToolsInput - The input type for the compareAiTools function.
 * - CompareAiToolsOutput - The return type for the compareAiTools function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiToolSchema = z.object({
  name: z.string().describe('The name of the AI tool.'),
  description: z.string().describe('A brief description of the AI tool.'),
  // Add more fields here as needed for a richer comparison, e.g., features, pricing, use cases.
});

const CompareAiToolsInputSchema = z.object({
  tools: z.array(AiToolSchema).describe('An array of AI tools to compare.'),
});
export type CompareAiToolsInput = z.infer<typeof CompareAiToolsInputSchema>;

const CompareAiToolsOutputSchema = z.object({
  summary: z.string().describe('An overall summary of the comparison between the tools.'),
  similarities: z.array(z.string()).describe('A list of key similarities found among the tools.'),
  differences: z.array(z.string()).describe('A list of key differences between the tools.'),
  toolsComparison: z.array(
    z.object({
      toolName: z.string().describe('The name of the AI tool being analyzed.'),
      pros: z.array(z.string()).describe('A list of advantages or positive aspects of the tool.'),
      cons: z.array(z.string()).describe('A list of disadvantages or negative aspects of the tool.'),
    })
  ).describe('A detailed breakdown of pros and cons for each individual tool.'),
});
export type CompareAiToolsOutput = z.infer<typeof CompareAiToolsOutputSchema>;

export async function compareAiTools(input: CompareAiToolsInput): Promise<CompareAiToolsOutput> {
  return compareAiToolsFlow(input);
}

const compareAiToolsPrompt = ai.definePrompt({
  name: 'compareAiToolsPrompt',
  input: { schema: CompareAiToolsInputSchema },
  output: { schema: CompareAiToolsOutputSchema },
  prompt: `You are an expert AI tool analyst. Your task is to compare the provided AI tools and generate a comprehensive comparison report.

The report should include:
1.  An overall summary of the comparison.
2.  Key similarities between the tools.
3.  Key differences between the tools.
4.  For each tool, a list of its pros and cons.

Here are the AI tools to compare:

{{#each tools}}
Tool Name: {{{this.name}}}
Description: {{{this.description}}}
---
{{/each}}

Please provide the output in JSON format, strictly following the provided schema.`,
});

const compareAiToolsFlow = ai.defineFlow(
  {
    name: 'compareAiToolsFlow',
    inputSchema: CompareAiToolsInputSchema,
    outputSchema: CompareAiToolsOutputSchema,
  },
  async (input) => {
    const { output } = await compareAiToolsPrompt(input);
    return output!;
  }
);
