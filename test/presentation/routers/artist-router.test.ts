import request from 'supertest';
import { Artist } from '../../../src/domain/entities/artist';
import { CreateArtistUseCase } from '../../../src/domain/interfaces/use-cases/artist/create-artist';
import { DeleteArtistUseCase } from '../../../src/domain/interfaces/use-cases/artist/delete-artist';
import { GetAllArtistUseCase } from '../../../src/domain/interfaces/use-cases/artist/get-all-artist';
import { UpdateArtistUseCase } from '../../../src/domain/interfaces/use-cases/artist/update-artist';
import ArtistRouter from '../../../src/presentation/routers/artist-router';
import server from '../../../src/server';

class MockGetAllArtistUseCase implements GetAllArtistUseCase {
  execute(): Promise<Artist[]> {
    throw new Error('Method not implemented');
  }
}

class MockCreateArtistUseCase implements CreateArtistUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class MockUpdateArtistUseCase implements UpdateArtistUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class MockDeleteArtistUseCase implements DeleteArtistUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

describe('Artist router', () => {
  let mockCreateArtistUseCase: CreateArtistUseCase;
  let mockGetAllArtistUseCase: GetAllArtistUseCase;
  let mockUpdateArtistUseCase: UpdateArtistUseCase;
  let mockDeleteArtistUseCase: DeleteArtistUseCase;

  beforeAll(() => {
    mockCreateArtistUseCase = new MockCreateArtistUseCase();
    mockGetAllArtistUseCase = new MockGetAllArtistUseCase();
    mockUpdateArtistUseCase = new MockUpdateArtistUseCase();
    mockDeleteArtistUseCase = new MockDeleteArtistUseCase();
    server.use(
      '/artist',
      ArtistRouter(
        mockGetAllArtistUseCase,
        mockCreateArtistUseCase,
        mockUpdateArtistUseCase,
        mockDeleteArtistUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /artist', () => {
    test('should return 200 with data', async () => {
      const ExpectedData = [
        {
          id: '1',
          name: 'Antho',
          cover: 'Yolo',
        },
      ];
      jest
        .spyOn(mockGetAllArtistUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get('/artist');

      expect(response.status).toBe(200);
      expect(mockGetAllArtistUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test('GET /artist returns 500 on use case error', async () => {
      jest
        .spyOn(mockGetAllArtistUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get('/artist');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Error fetching data' });
    });
  });

  describe('POST /artist', () => {
    test('POST /artist returns 201', async () => {
      const InputData = {
        id: '1',
        name: 'Antho',
        cover: 'Yolo',
      };
      jest
        .spyOn(mockCreateArtistUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post('/artist').send(InputData);
      expect(response.status).toBe(201);
    });

    test('POST /artist returns 500 on use case error', async () => {
      const InputData = {
        id: '1',
        name: 'Antho',
        cover: 'Yolo',
      };
      jest
        .spyOn(mockCreateArtistUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post('/artist').send(InputData);
      expect(response.status).toBe(500);
    });
  });

  describe('PATCH /artist', () => {
    test('PATCH /artist returns 201', async () => {
      const InputData = {
        name: 'Antho',
        cover: 'Yolo',
      };
      jest
        .spyOn(mockUpdateArtistUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .patch('/artist/123456789')
        .send(InputData);
      expect(response.status).toBe(201);
    });

    test('PATCH /artist returns 500 on use case error', async () => {
      const InputData = {
        name: 'Antho',
        cover: 'Yolo',
      };
      jest
        .spyOn(mockUpdateArtistUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .patch('/artist/123456789')
        .send(InputData);
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /artist', () => {
    test('DELETE /artist returns 201', async () => {
      jest
        .spyOn(mockDeleteArtistUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete('/artist/123456789').send();
      expect(response.status).toBe(201);
    });

    test('DELETE /artist returns 500 on use case error', async () => {
      jest
        .spyOn(mockDeleteArtistUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete('/artist/123456789').send();
      expect(response.status).toBe(500);
    });
  });
});
