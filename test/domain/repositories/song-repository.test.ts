import { SongDataSource } from '../../../src/data/interfaces/data-sources/song-data-source';
import { Song } from '../../../src/domain/entities/song';
import { SongRepositoryImpl } from '../../../src/domain/repositories/song-repository';

class MockSongDataSource implements SongDataSource {
  getAll(): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string): Promise<Song> {
    throw new Error('Method not implemented.');
  }
  find(song: Partial<Song>): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }
  create(song: Song): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateOne(id: string, data: Object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

describe('Song repository', () => {
  let mockSongDataSource: MockSongDataSource;
  let songRepository: SongRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSongDataSource = new MockSongDataSource();
    songRepository = new SongRepositoryImpl(mockSongDataSource);
  });

  describe('getAllSongs', () => {
    test('should return data', async () => {
      const expectedData = [
        {
          id: '1',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ];
      jest
        .spyOn(mockSongDataSource, 'getAll')
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await songRepository.getAllSong();
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('getOneSong', () => {
    test('should return data', async () => {
      const expectedData = {
        id: '1',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      };
      jest
        .spyOn(mockSongDataSource, 'getOne')
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await songRepository.getOneSong('1');
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('findSong', () => {
    test('should return data', async () => {
      const expectedData = [
        {
          id: '1',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ];
      const inputData = {
        name: 'Antho',
        artistId: '123',
      };
      jest
        .spyOn(mockSongDataSource, 'find')
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await songRepository.findSong(inputData);
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('createSong', () => {
    test('should return true', async () => {
      const inputData = {
        id: '1',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      };
      jest
        .spyOn(mockSongDataSource, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const result = await songRepository.createSong(inputData);
      expect(result).toBe(true);
    });
  });

  describe('updateSong', () => {
    test('should return true', async () => {
      const inputData = {
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      };
      jest
        .spyOn(mockSongDataSource, 'updateOne')
        .mockImplementation(() => Promise.resolve(true));

      const result = await songRepository.updateSong('1', inputData);
      expect(result).toBe(true);
    });

    describe('delete song', () => {
      test('should return true', async () => {
        jest
          .spyOn(mockSongDataSource, 'deleteOne')
          .mockImplementation(() => Promise.resolve(true));

        const result = await songRepository.deleteSong('1');
        expect(result).toBe(true);
      });
    });
  });
});
