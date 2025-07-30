// This is an AI-powered tool designed to provide personalized product recommendations to users browsing an e-commerce platform.

'use server';

/**
 * @fileOverview Provides AI-driven product recommendations based on a given product.
 *
 * - getProductRecommendations - A function that takes a product description and returns a list of recommended products.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('A detailed description of the product for which recommendations are to be generated.'),
  productCategory: z.string().describe('Category of the product'),
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('An array of product names that are recommended based on the input product description.'),
});

export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce assistant specializing in product recommendations.
  Given a product description and its category, you will provide a list of other products that the user might be interested in, given the initial product they are looking at.
  These products should be of the same type, or of a complementary type.
  Make sure not to recommend the same product, and that the products are all available for sale on an e-commerce website.
  
  Product Description: {{{productDescription}}}
  Category: {{{productCategory}}}
  
  Based on the product description and category above, here are the recommended product names:
  `, // Added a space at the end of the prompt
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
