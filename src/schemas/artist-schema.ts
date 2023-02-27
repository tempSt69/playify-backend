import { z } from 'zod';

export const createArtistSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3),
    cover: z
      .string({
        required_error: 'Cover is required',
      })
      .url({
        message: 'Cover must be an URL',
      }),
  }),
});

export const updateArtistSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    cover: z.string().url({ message: 'Cover must be an URL' }).optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Params id is required' }).min(8),
  }),
});

export const deleteArtistSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Params id is required' }).min(8),
  }),
});
