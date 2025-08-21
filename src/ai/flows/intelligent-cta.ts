// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A call to action AI agent.
 *
 * - getIntelligentCTA - A function that handles the call to action process.
 * - IntelligentCTAInput - The input type for the getIntelligentCTA function.
 * - IntelligentCTAOutput - The return type for the getIntelligentCTA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentCTAInputSchema = z.object({
  navigationPattern: z.string().describe('El patrón de navegación del usuario en el sitio web.'),
});
export type IntelligentCTAInput = z.infer<typeof IntelligentCTAInputSchema>;

const IntelligentCTAOutputSchema = z.object({
  cta: z.string().describe('La llamada a la acción para mostrar al usuario.'),
});
export type IntelligentCTAOutput = z.infer<typeof IntelligentCTAOutputSchema>;

export async function getIntelligentCTA(input: IntelligentCTAInput): Promise<IntelligentCTAOutput> {
  return intelligentCTAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentCTAPrompt',
  input: {schema: IntelligentCTAInputSchema},
  output: {schema: IntelligentCTAOutputSchema},
  prompt: `Eres un experto en la generación de llamadas a la acción.

  Basado en el patrón de navegación del usuario, generarás una llamada a la acción para animar al usuario a explorar proyectos o programar una reunión.

  Patrón de navegación: {{{navigationPattern}}}

  Considera el patrón de navegación y sugiere solo UNA llamada a la acción que sea más relevante para el usuario.
  Si el usuario está navegando por proyectos, anímale a programar una reunión. Si el usuario no está navegando por proyectos, anímale a explorar proyectos.
  La llamada a la acción debe ser concisa y procesable. No incluyas ninguna explicación. p.ej. "Explorar Proyectos" o "Programar una Reunión".`,
});

const intelligentCTAFlow = ai.defineFlow(
  {
    name: 'intelligentCTAFlow',
    inputSchema: IntelligentCTAInputSchema,
    outputSchema: IntelligentCTAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
