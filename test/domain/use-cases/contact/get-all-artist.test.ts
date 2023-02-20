import { Artist } from '../../../../src/domain/entities/artist';
import { ArtistRepository } from '../../../../src/domain/interfaces/repositories/artist-repository';
import { GetAllArtists } from '../../../../src/domain/use-cases/get-all-artist';

describe('Get all contacts use case', () => {
  class MockArtistRepository implements ArtistRepository {
    updateArtist(
      id: string,
      contact: Partial<Omit<Artist, 'id'>>
    ): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    deleteArtist(id: string): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    createArtist(contact: Artist): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    getArtists(): Promise<Artist[]> {
      throw new Error('Method not implemented.');
    }
  }

  let mockArtistRepository: ArtistRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockArtistRepository = new MockArtistRepository();
  });

  test('should return somthing', async () => {
    const ExpectedData = [{ id: '1', name: 'Smith', cover: 'John' }];

    jest
      .spyOn(mockArtistRepository, 'getArtists')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const getAllArtistsUse = new GetAllArtists(mockArtistRepository);
    const result = await getAllArtistsUse.execute();
    expect(result).toStrictEqual(ExpectedData);
  });
});
