import { MongoDBArtistDataSource } from '../../../../src/data/data-sources/mongodb/entity/mongodb-artist-data-source';
import { getMongoDBTest } from '../../../../src/data/data-sources/mongodb/mongodb-helpers';
import { Db } from 'mongodb';

jest.useRealTimers();

describe('MongoDB datasource', () => {
  let mockDb: Db;

  beforeAll(() => {
    mockDb = getMongoDBTest();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('insertOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDb);
    const result = await ds.insertOne({
      name: 'Smith',
      cover: 'John',
    });
    expect(result.acknowledged).toBeTruthy();
  });

  test('getAll', async () => {
    const ds = new MongoDBArtistDataSource(mockDb);
    const result = await ds.getAll();
    expect(typeof result).toBe('object');
    expect(result.length).toBeGreaterThan(0);
  });

  test('updateOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDb);
    const result = await ds.updateOne('63f50d0742477a0aad95964c', {
      name: 'Smith',
      cover: 'john@gmail.com',
    });
    expect(result.acknowledged).toBeTruthy();
  });

  test('deleteOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDb);
    const result = await ds.deleteOne('63f50d0742477a0aad95964c');
    expect(result.acknowledged).toBeTruthy();
  });
});
