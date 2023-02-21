import { ArtistDataSource } from '../../../src/data/interfaces/data-sources/entity/artist-data-source';
import { Artist } from '../../../src/domain/entities/artist';
import { ArtistRepositoryImpl } from '../../../src/domain/repositories/artist-repository';

class MockArtistDataSource implements ArtistDataSource {
  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateOne(id: string, data: Object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  create(artist: Artist): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Artist[]> {
    throw new Error('Method not implemented.');
  }
}

describe('Artist repository', () => {
  let mockArtistDataSource: MockArtistDataSource;
  let artistRepository: ArtistRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    mockArtistDataSource = new MockArtistDataSource();
    artistRepository = new ArtistRepositoryImpl(mockArtistDataSource);
  });

  describe('getAllArtists', () => {
    test('should return data', async () => {
      const expectedData = [
        {
          id: '1',
          name: 'Smith',
          cover: 'John',
        },
      ];
      jest
        .spyOn(mockArtistDataSource, 'getAll')
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await artistRepository.getArtists();
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('createArtist', () => {
    test('should return true', async () => {
      const inputData = {
        id: '1',
        name: 'Smith',
        cover: 'John',
      };
      jest
        .spyOn(mockArtistDataSource, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const result = await artistRepository.createArtist(inputData);
      expect(result).toBe(true);
    });
  });

  describe('updateArtist', () => {
    test('should return true', async () => {
      const inputData = {
        name: 'Smith',
        cover: 'John',
      };
      jest
        .spyOn(mockArtistDataSource, 'updateOne')
        .mockImplementation(() => Promise.resolve(true));

      const result = await artistRepository.updateArtist('1', inputData);
      expect(result).toBe(true);
    });

    describe('delete artist', () => {
      test('should return true', async () => {
        jest
          .spyOn(mockArtistDataSource, 'deleteOne')
          .mockImplementation(() => Promise.resolve(true));

        const result = await artistRepository.deleteArtist('1');
        expect(result).toBe(true);
      });
    });
  });
});
