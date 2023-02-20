import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/database-wrapper';
import { MongoDBSongDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-song-data-source';
import { ObjectId } from 'mongodb';

describe('MongoDB datasource', () => {
  let mockDatabase: DatabaseWrapper;

  beforeAll(() => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
      deleteOne: jest.fn(),
      updateOne: jest.fn(),
      findOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'find').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '123',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ])
    );
    const result = await ds.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual([
      {
        id: '123',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      },
    ]);
  });

  test('getOne', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'findOne').mockImplementation(() =>
      Promise.resolve({
        _id: '63f37295e571cc2eb7d534fc',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      })
    );
    const result = await ds.getOne('63f37295e571cc2eb7d534fc');
    expect(mockDatabase.findOne).toHaveBeenCalledWith(
      new ObjectId('63f37295e571cc2eb7d534fc')
    );
    expect(result).toStrictEqual({
      id: '63f37295e571cc2eb7d534fc',
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
  });

  test('getOne fails', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'findOne')
      .mockImplementation(() => Promise.resolve(undefined));
    const result = await ds.getOne('63f37295e571cc2eb7d534fa');
    expect(mockDatabase.findOne).toHaveBeenCalledWith(
      new ObjectId('63f37295e571cc2eb7d534fa')
    );
    expect(result).toStrictEqual(undefined);
  });

  test('find', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'find').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '123',
          name: 'Antho',
          artistId: '123',
          trackUrl: 'http://yaanhau',
          duration: 180,
        },
      ])
    );
    const result = await ds.find({
      name: 'Antho',
    });
    expect(mockDatabase.find).toHaveBeenCalledWith({ $or: { name: 'Antho' } });
    expect(result).toStrictEqual([
      {
        id: '123',
        name: 'Antho',
        artistId: '123',
        trackUrl: 'http://yaanhau',
        duration: 180,
      },
    ]);
  });

  test('insertOne', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'insertOne')
      .mockImplementation(() => Promise.resolve({ insertedId: '123' }));
    const result = await ds.create({
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
    expect(mockDatabase.insertOne).toHaveBeenCalledWith({
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
    expect(result).toStrictEqual(true);
  });

  test('updateOne', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'updateOne')
      .mockImplementation(() => Promise.resolve({ acknowledged: true }));
    const result = await ds.updateOne('1', {
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
    expect(mockDatabase.updateOne).toHaveBeenCalledWith('1', {
      name: 'Antho',
      artistId: '123',
      trackUrl: 'http://yaanhau',
      duration: 180,
    });
    expect(result).toStrictEqual(true);
  });

  test('deleteOne', async () => {
    const ds = new MongoDBSongDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'deleteOne')
      .mockImplementation(() => Promise.resolve({ acknowledged: true }));
    const result = await ds.deleteOne('1');
    expect(mockDatabase.deleteOne).toHaveBeenCalledWith('1');
    expect(result).toStrictEqual(true);
  });
});
