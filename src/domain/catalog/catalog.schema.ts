import { z } from 'zod';

export const productVariantSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  priceCents: z.number().int().positive().nullable(),
  unit: z.string().optional(),
  unitAmount: z.number().positive().optional(),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(['olio', 'legumi', 'condimenti']),
  image: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
  variants: z.array(productVariantSchema).min(1),
  published: z.boolean(),
  available: z.boolean(),
  badges: z.array(z.enum(['bio', 'slow-food'])).optional(),
});

export const catalogSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
