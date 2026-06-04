'use server';
/**
 * @fileOverview This file implements a Genkit flow that summarizes an array of AI tool reviews into a single concise summary.
 *
 * - summarizeToolReviews - A function that triggers the review summarization process.
 * - SummarizeToolReviewsInput - The input type for the summarizeToolReviews function.
 * - SummarizeToolReviewsOutput - The return type for the summarizeToolReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeToolReviewsInputSchema = z
  .object({
    reviews: z.array(z.string()).describe('An array of individual AI tool reviews.'),
  })
  .describe('Input for summarizing AI tool reviews, consisting of a list of review strings.');
export type SummarizeToolReviewsInput = z.infer<typeof SummarizeToolReviewsInputSchema>;

const SummarizeToolReviewsOutputSchema = z
  .string()
  .describe('A concise, neutral summary of the provided AI tool reviews.');
export type SummarizeToolReviewsOutput = z.infer<typeof SummarizeToolReviewsOutputSchema>;

export async function summarizeToolReviews(
  input: SummarizeToolReviewsInput
): Promise<SummarizeToolReviewsOutput> {
  return summarizeToolReviewsFlow(input);
}

const summarizeToolReviewsPrompt = ai.definePrompt({
  name: 'summarizeToolReviewsPrompt',
  input: {schema: SummarizeToolReviewsInputSchema},
  output: {schema: SummarizeToolReviewsOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing customer reviews for products.
Your task is to provide a concise, neutral, and informative summary of the key points and overall sentiment expressed in the provided reviews.
Focus on common themes, strengths, weaknesses, and any recurring feedback.
The summary should be easy to read and understand, highlighting the most important aspects for someone considering using the tool.

Reviews to summarize:
{{#each reviews}}
- {{{this}}}
{{/each}}`,
});

const summarizeToolReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeToolReviewsFlow',
    inputSchema: SummarizeToolReviewsInputSchema,
    outputSchema: SummarizeToolReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeToolReviewsPrompt(input);
    return output!;
  }
);
