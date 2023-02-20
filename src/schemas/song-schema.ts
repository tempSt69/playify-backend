import { z } from 'zod';

export const createSongSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1),
    artistId: z
      .string({
        required_error: 'ArtistId is required',
      })
      .min(3),
    duration: z.number({
      required_error: 'duration in second is required',
    }),
  }),
});

export const updateSongSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1)
      .optional(),
    trackUrl: z
      .string({
        required_error: 'TrackUrl is required',
      })
      .min(10)
      .optional(),
    artistId: z
      .string({
        required_error: 'ArtistId is required',
      })
      .min(3)
      .optional(),
    duration: z
      .number({
        required_error: 'duration in second is required',
      })
      .optional(),
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
