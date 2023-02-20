import request from 'supertest';
import { Song } from '../../../src/domain/entities/song';
import { CreateSongUseCase } from '../../../src/domain/interfaces/use-cases/song/create-song';
import { DeleteSongUseCase } from '../../../src/domain/interfaces/use-cases/song/delete-song';
import { GetAllSongUseCase } from '../../../src/domain/interfaces/use-cases/song/get-all-song';
import { UpdateSongUseCase } from '../../../src/domain/interfaces/use-cases/song/update-song';
import { GetOneSongUseCase } from '../../../src/domain/interfaces/use-cases/song/get-one-song';
import { FindSongUseCase } from '../../../src/domain/interfaces/use-cases/song/find-song';
import SongRouter from '../../../src/presentation/routers/song-router';
import server from '../../../src/server';

class MockGetAllSongUseCase implements GetAllSongUseCase {
  execute(): Promise<Song[]> {
    throw new Error('Method not implemented');
  }
}

class MockCreateSongUseCase implements CreateSongUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class MockUpdateSongUseCase implements UpdateSongUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class MockDeleteSongUseCase implements DeleteSongUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class MockGetOneSongUseCase implements GetOneSongUseCase {
  execute(): Promise<Song> {
    throw new Error('Method not implemented');
  }
}

class MockFindSongUseCase implements FindSongUseCase {
  execute(): Promise<Song[]> {
    throw new Error('Method not implemented');
  }
}

describe('Song router', () => {
  let mockCreateSongUseCase: CreateSongUseCase;
  let mockGetAllSongUseCase: GetAllSongUseCase;
  let mockUpdateSongUseCase: UpdateSongUseCase;
  let mockDeleteSongUseCase: DeleteSongUseCase;
  let mockGetOneSongUseCase: GetOneSongUseCase;
  let mockFindSongUseCase: FindSongUseCase;

  beforeAll(() => {
    mockCreateSongUseCase = new MockCreateSongUseCase();
    mockGetAllSongUseCase = new MockGetAllSongUseCase();
    mockUpdateSongUseCase = new MockUpdateSongUseCase();
    mockDeleteSongUseCase = new MockDeleteSongUseCase();
    mockGetOneSongUseCase = new MockGetOneSongUseCase();
    mockFindSongUseCase = new MockFindSongUseCase();
    server.use(
      '/song',
      SongRouter(
        mockGetAllSongUseCase,
        mockCreateSongUseCase,
        mockUpdateSongUseCase,
        mockDeleteSongUseCase,
        mockGetOneSongUseCase,
        mockFindSongUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /song', () => {
    test('should return 200 with data', async () => {
      const ExpectedData = [
        {
          id: '1',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ];
      jest
        .spyOn(mockGetAllSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get('/song');

      expect(response.status).toBe(200);
      expect(mockGetAllSongUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test('GET /song returns 500 on use case error', async () => {
      jest
        .spyOn(mockGetAllSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get('/song');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Error fetching data' });
    });
  });

  describe('GET /song/:id', () => {
    test('should return 200 with data', async () => {
      const ExpectedData = {
        id: '1',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      };
      jest
        .spyOn(mockGetOneSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get('/song/123456789');

      expect(response.status).toBe(200);
      expect(mockGetOneSongUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test('GET /song/:id returns 500 on use case error', async () => {
      jest
        .spyOn(mockGetOneSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get('/song/12345678');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Error fetching data' });
    });
  });

  describe('GET /song/search/:searchString', () => {
    test('should return 200 with data', async () => {
      const ExpectedData = [
        {
          id: '1',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ];
      jest
        .spyOn(mockFindSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get('/song/search/Antho');

      expect(response.status).toBe(200);
      expect(mockFindSongUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test('GET /song/search/:searchString returns 500 on use case error', async () => {
      jest
        .spyOn(mockFindSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get('/song/search/Antho');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Error fetching data' });
    });
  });

  describe('POST /song', () => {
    test('POST /song returns 201', async () => {
      jest
        .spyOn(mockCreateSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .post('/song')
        .field('name', 'Hey')
        .field('artistId', '176655')
        .field('duration', '180');
      expect(response.status).toBe(400); //TODO THINGS HERE
    });

    test('POST /song returns 500 on use case error', async () => {
      jest
        .spyOn(mockCreateSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .post('/song')
        .field('name', 'Hey')
        .field('artistId', '176655')
        .field('duration', '180')
        .expect((res) => res.status === 500);
    });
  });

  describe('PATCH /song', () => {
    test('PATCH /song returns 201', async () => {
      const InputData = {
        name: 'Antho',
        artistId: '123',
        duration: 180,
      };
      jest
        .spyOn(mockUpdateSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .patch('/song/123456789')
        .send(InputData);
      expect(response.status).toBe(201);
    });

    test('PATCH /song returns 500 on use case error', async () => {
      const InputData = {
        name: 'Antho',
        artistId: '123',
        duration: 180,
      };
      jest
        .spyOn(mockUpdateSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .patch('/song/123456789')
        .send(InputData);
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /song', () => {
    test('DELETE /song returns 201', async () => {
      jest
        .spyOn(mockDeleteSongUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete('/song/123456789').send();
      expect(response.status).toBe(201);
    });

    test('DELETE /song returns 500 on use case error', async () => {
      jest
        .spyOn(mockDeleteSongUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete('/song/123456789').send();
      expect(response.status).toBe(500);
    });
  });
});
