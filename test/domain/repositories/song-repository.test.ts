import { SongRepositoryImpl } from '../../../src/domain/repositories/song-repository';
import { NoSQLDatabaseWrapper } from '../../../src/data/interfaces/data-sources/nosql-database-wrapper';
import { SongDataSource } from '../../../src/data/interfaces/data-sources/entity/song-data-source';

class MockSongDataSource implements SongDataSource {
  findOneFilter(filter: object): Promise<any> {
    throw new Error('Method not implemented.');
  }
  searchIndex?: string | undefined;
  searchIndexText?: string | undefined;
  searchField?: string | undefined;
  getAll(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  find(query: object): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insertOne(doc: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateOne(id: string, data: Object): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  search(searchString: string, field: string): Promise<any[]> {
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
          artist: {
            name: 'okikk',
            cover: 'hyhydsf',
          },
          trackUrl: 'http://yaanhau',
          trackType: 'audio/mpeg',
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
        artist: {
          name: 'okikk',
          cover: 'hyhydsf',
        },
        trackUrl: 'http://yaanhau',
        trackType: 'audio/mpeg',
        duration: 180,
      };
      jest
        .spyOn(mockSongDataSource, 'findOne')
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await songRepository.getOneSong('1');
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('search song', () => {
    test('should return data', async () => {
      const expectedData = [
        {
          _id: '1',
          name: 'Antho',
          artist: {
            name: 'okikk',
            cover: 'hyhydsf',
          },
          trackUrl: 'http://yaanhau',
          trackType: 'audio/mpeg',
          duration: 180,
        },
      ];
      const inputData = 'Antho';
      jest
        .spyOn(mockSongDataSource, 'search')
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
        artist: {
          name: 'okikk',
          cover: 'hyhydsf',
        },
        trackUrl: 'http://yaanhau',
        trackType: 'audio/mpeg',
        duration: 180,
      };
      jest
        .spyOn(mockSongDataSource, 'insertOne')
        .mockImplementation(() => Promise.resolve(true));

      const result = await songRepository.createSong(inputData);
      expect(result).toBe(true);
    });
  });

  describe('updateSong', () => {
    test('should return true', async () => {
      const inputData = {
        name: 'Antho',
        artist: {
          name: 'okikk',
          cover: 'hyhydsf',
        },
        trackUrl: 'http://yaanhau',
        trackType: 'audio/mpeg',
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
