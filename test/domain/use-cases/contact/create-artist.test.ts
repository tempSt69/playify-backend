import { Artist } from '../../../../src/domain/entities/artist';
import { ArtistRepository } from '../../../../src/domain/interfaces/repositories/artist-repository';
import { CreateArtist } from '../../../../src/domain/use-cases/create-artist';

describe('Create contact use case', () => {
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
    createArtist(artist: Artist): Promise<boolean> {
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

  test('should return true', async () => {
    const InputData = {
      id: '1',
      name: 'Smith',
      cover: 'John',
    };
    jest
      .spyOn(mockArtistRepository, 'createArtist')
      .mockImplementation(() => Promise.resolve(true));

    const createArtistUseCase = new CreateArtist(mockArtistRepository);
    const result = await createArtistUseCase.execute(InputData);
    expect(result).toBe(true);
  });
});
