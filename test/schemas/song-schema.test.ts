import {
  createSongSchema,
  deleteSongSchema,
  findSongSchema,
  getOneSongSchema,
  updateSongSchema,
} from '../../src/schemas/song-schema';

describe('SONGS: Zod schemas validator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('createSong, should work', () => {
    const inputData = {
      body: {
        name: 'Antho',
        artist: {
          _id: 'BNYTVTYJV',
          name: 'okhu',
          cover: 'https://snowball.gg',
        },
        duration: 180,
      },
    };
    const result = createSongSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('createSong, should fail', () => {
    const inputData = {
      body: {
        name: 'Antho',
        artist: {
          namedd: 'okhu',
          cover: 'okjnj',
        },
        duration: 180,
      },
    };
    const result = createSongSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('updateSong, should work', () => {
    const inputData = {
      params: {
        id: '123456789',
      },
      body: {
        name: 'Antho',
        artist: {
          _id: '1768TBHHJBJ',
          name: 'okhu',
          cover: 'https://snowball.gg',
        },
        duration: 180,
      },
    };
    const result = updateSongSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('updateSong, should fail', () => {
    const inputData = {
      params: {
        id: '16789',
      },
      body: {
        name: 'Antho',
        artist: '12345678',
        duration: 180,
      },
    };
    const result = updateSongSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('deleteSong, should work', () => {
    const inputData = {
      params: {
        id: '123456789',
      },
    };
    const result = deleteSongSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('deleteSong, should fail', () => {
    const inputData = {
      params: {
        id: '16789',
      },
    };
    const result = deleteSongSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('getOne, should work', () => {
    const inputData = {
      params: {
        id: '123456789',
      },
    };
    const result = getOneSongSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('getOne, should fail', () => {
    const inputData = {
      params: {
        id: '16789',
      },
    };
    const result = getOneSongSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('find, should work', () => {
    const inputData = {
      params: {
        searchString: 'Kanye',
      },
    };
    const result = findSongSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('find, should fail', () => {
    const inputData = {
      params: {
        searchString: '',
      },
    };
    const result = findSongSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });
});
