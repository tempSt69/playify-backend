import { Song } from '../../../../src/domain/entities/song';
import { SongRepository } from '../../../../src/domain/interfaces/repositories/song-repository';
import { CreateSong } from '../../../../src/domain/use-cases/song/create-song';
import { DeleteSong } from '../../../../src/domain/use-cases/song/delete-song';
import { GetAllSong } from '../../../../src/domain/use-cases/song/get-all-song';
import { UpdateSong } from '../../../../src/domain/use-cases/song/update-song';
import { GetOneSong } from '../../../../src/domain/use-cases/song/get-one-song';
import { FindSong } from '../../../../src/domain/use-cases/song/find-song';

describe('Songs use case', () => {
  class MockSongRepository implements SongRepository {
    getAllSong(): Promise<Song[]> {
      throw new Error('Method not implemented.');
    }
    getOneSong(id: string): Promise<Song> {
      throw new Error('Method not implemented.');
    }
    findSong(song: Partial<Omit<Song, 'id'>>): Promise<Song[]> {
      throw new Error('Method not implemented.');
    }
    updateSong(id: string, song: Partial<Omit<Song, 'id'>>): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    deleteSong(id: string): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    createSong(song: Song): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    getSongs(): Promise<Song[]> {
      throw new Error('Method not implemented.');
    }
  }

  let mockSongRepository: SongRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSongRepository = new MockSongRepository();
  });

  test('getall -> return somthing', async () => {
    const ExpectedData = [
      {
        id: '1',
        name: 'Smith',
        artistId: '123',
        trackUrl: 'https://ahahhaa',
        duration: 180,
      },
    ];

    jest
      .spyOn(mockSongRepository, 'getAllSong')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const getAllSongsUse = new GetAllSong(mockSongRepository);
    const result = await getAllSongsUse.execute();
    expect(result).toStrictEqual(ExpectedData);
  });

  test('getone -> return somthing', async () => {
    const ExpectedData = {
      id: '1',
      name: 'Smith',
      artistId: '123',
      trackUrl: 'https://ahahhaa',
      duration: 180,
    };
    jest
      .spyOn(mockSongRepository, 'getOneSong')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const getOneSong = new GetOneSong(mockSongRepository);
    const result = await getOneSong.execute('1');
    expect(result).toStrictEqual(ExpectedData);
  });

  test('find -> return somthing', async () => {
    const ExpectedData = [
      {
        id: '1',
        name: 'Smith',
        artistId: '123',
        trackUrl: 'https://ahahhaa',
        duration: 180,
      },
    ];
    const InputData = {
      name: 'Smith',
    };
    jest
      .spyOn(mockSongRepository, 'findSong')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const findSong = new FindSong(mockSongRepository);
    const result = await findSong.execute(InputData);
    expect(result).toStrictEqual(ExpectedData);
  });

  test('create -> should return true', async () => {
    const InputData = {
      id: '1',
      name: 'Smith',
      artistId: '123',
      trackUrl: 'https://ahahhaa',
      duration: 180,
    };
    jest
      .spyOn(mockSongRepository, 'createSong')
      .mockImplementation(() => Promise.resolve(true));

    const createSongUseCase = new CreateSong(mockSongRepository);
    const result = await createSongUseCase.execute(InputData);
    expect(result).toBe(true);
  });

  test('update -> should return true', async () => {
    const InputData = {
      name: 'Smith',
      artistId: '123',
      trackUrl: 'https://ahahhaa',
      duration: 180,
    };
    jest
      .spyOn(mockSongRepository, 'updateSong')
      .mockImplementation(() => Promise.resolve(true));

    const updateSongUseCase = new UpdateSong(mockSongRepository);
    const result = await updateSongUseCase.execute('123', InputData);
    expect(result).toBe(true);
  });

  test('delete -> should return true', async () => {
    jest
      .spyOn(mockSongRepository, 'deleteSong')
      .mockImplementation(() => Promise.resolve(true));

    const deleteSongUseCase = new DeleteSong(mockSongRepository);
    const result = await deleteSongUseCase.execute('123');
    expect(result).toBe(true);
  });
});
