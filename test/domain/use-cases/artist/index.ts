import { Artist } from '../../../../src/domain/entities/artist';
import { ArtistRepository } from '../../../../src/domain/interfaces/repositories/artist-repository';
import { CreateArtist } from '../../../../src/domain/use-cases/create-artist';
import { DeleteArtist } from '../../../../src/domain/use-cases/delete-artist';
import { GetAllArtists } from '../../../../src/domain/use-cases/get-all-artist';
import { UpdateArtist } from '../../../../src/domain/use-cases/update-artist';

describe('Artists use case', () => {
  class MockArtistRepository implements ArtistRepository {
    updateArtist(
      id: string,
      artist: Partial<Omit<Artist, 'id'>>
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

  test('create -> should return true', async () => {
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

  test('getall -> return somthing', async () => {
    const ExpectedData = [{ id: '1', name: 'Smith', cover: 'John' }];

    jest
      .spyOn(mockArtistRepository, 'getArtists')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const getAllArtistsUse = new GetAllArtists(mockArtistRepository);
    const result = await getAllArtistsUse.execute();
    expect(result).toStrictEqual(ExpectedData);
  });

  test('update -> should return true', async () => {
    const InputData = {
      name: 'Smith',
      cover: 'John',
    };
    jest
      .spyOn(mockArtistRepository, 'updateArtist')
      .mockImplementation(() => Promise.resolve(true));

    const updateArtistUseCase = new UpdateArtist(mockArtistRepository);
    const result = await updateArtistUseCase.execute('123', InputData);
    expect(result).toBe(true);
  });

  test('delete -> should return true', async () => {
    jest
      .spyOn(mockArtistRepository, 'deleteArtist')
      .mockImplementation(() => Promise.resolve(true));

    const deleteArtistUseCase = new DeleteArtist(mockArtistRepository);
    const result = await deleteArtistUseCase.execute('123');
    expect(result).toBe(true);
  });
});
