import {
  createArtistSchema,
  deleteArtistSchema,
  updateArtistSchema,
} from '../../src/schemas/artist-schema';

describe('ARTISTS: Zod schemas validator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('createArtist, should work', () => {
    const inputData = {
      body: {
        name: 'Antho',
        cover: 'https://snowball.gg',
      },
    };
    const result = createArtistSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('createArtist, should fail', () => {
    const inputData = {
      body: {
        name: 'Antho',
        cover: 'Yolo',
      },
    };
    const result = createArtistSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('updateArtist, should work', () => {
    const inputData = {
      params: {
        id: '123456789',
      },
      body: {
        name: 'Antho',
        cover: 'https://snowball.gg',
      },
    };
    const result = updateArtistSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('updateArtist, should fail', () => {
    const inputData = {
      params: {
        id: '16789',
      },
      body: {
        name: 'Antho',
        cover: 'Yolo',
      },
    };
    const result = updateArtistSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('deleteArtist, should work', () => {
    const inputData = {
      params: {
        id: '123456789',
      },
    };
    const result = deleteArtistSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('deleteArtist, should fail', () => {
    const inputData = {
      params: {
        id: '16789',
      },
    };
    const result = deleteArtistSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });
});
