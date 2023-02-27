import { MongoDBSongDataSource } from '../../../../src/data/data-sources/mongodb/entity/mongodb-song-data-source';
import { Db } from 'mongodb';
import { getMongoDBTest } from '../../../../src/data/data-sources/mongodb/mongodb-helpers';

describe('MongoDB datasource', () => {
  let mockDb: Db;

  beforeAll(() => {
    mockDb = getMongoDBTest();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('insertOne', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.insertOne({
      name: 'Antho',
      artist: {
        name: 'okikk',
        cover: 'https://snowball.gg',
      },
      trackUrl: 'http://yaanhau',
      trackType: 'audio/mpeg',
      duration: 180,
    });
    expect(result).toBeTruthy();
  });

  test('getAll', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.getAll();
    expect(typeof result).toBe('object');
  });

  test('getOne', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.findOne('63f51f3cfb7583163f0121c5');
    expect(typeof result).toBe('object');
  });

  test('getOne fails', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.findOne('63f51f3cfb7583163f0121c4');
    expect(result).toStrictEqual(null);
  });

  test('search', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.searchTest('yaanhau');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(0);
  });

  test('updateOne', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.updateOne('63f51f3cfb7583163f0121c5', {
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
    expect(result).toBeFalsy();
  });

  test('deleteOne', async () => {
    const ds = new MongoDBSongDataSource(mockDb);
    const result = await ds.deleteOne('63f51f3cfb7583163f0121c5');
    expect(result).toBeFalsy();
  });
});
