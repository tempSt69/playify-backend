import { z } from 'zod';

export const createSongSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1),
    artist: z.object({
      name: z
        .string({
          required_error: 'Artist Name is required',
        })
        .min(3),
      cover: z
        .string({
          required_error: 'Artist Cover is required',
        })
        .min(3),
    }),
    duration: z.number({
      required_error: 'duration in second is required',
    }),
  }),
});

export const updateSongSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    trackUrl: z.string().min(10).optional(),
    trackType: z.string().min(10).optional(),
    artistId: z
      .object({
        name: z.string().min(3).optional(),
        cover: z.string().min(3).optional(),
      })
      .optional(),
    duration: z.number().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Param id is required' }).min(8),
  }),
});

export const deleteSongSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Param id is required' }).min(8),
  }),
});

export const getOneSongSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Param id is required' }).min(8),
  }),
});

export const findSongSchema = z.object({
  params: z.object({
    searchString: z
      .string({
        required_error: 'Search string is required',
      })
      .min(1)
      .optional(),
  }),
});

export const streamSongSchema = z.object({
  params: z.object({
    fileName: z.string({ required_error: 'Param fileName is required' }).min(8),
    mimeType: z.string({ required_error: 'Param mimeType is required' }).min(5),
  }),
});
