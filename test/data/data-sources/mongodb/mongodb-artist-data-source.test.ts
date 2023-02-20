import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/database-wrapper';
import { MongoDBArtistDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-artist-data-source';

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
    const ds = new MongoDBArtistDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'find').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '123',
          name: 'Smith',
          cover: 'John',
        },
      ])
    );
    const result = await ds.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual([
      {
        id: '123',
        name: 'Smith',
        cover: 'John',
      },
    ]);
  });

  test('insertOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'insertOne')
      .mockImplementation(() => Promise.resolve({ insertedId: '123' }));
    const result = await ds.create({
      name: 'Smith',
      cover: 'john@gmail.com',
    });
    expect(mockDatabase.insertOne).toHaveBeenCalledWith({
      name: 'Smith',
      cover: 'john@gmail.com',
    });
    expect(result).toStrictEqual(true);
  });

  test('updateOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'updateOne')
      .mockImplementation(() => Promise.resolve({ acknowledged: true }));
    const result = await ds.updateOne('1', {
      name: 'Smith',
      cover: 'john@gmail.com',
    });
    expect(mockDatabase.updateOne).toHaveBeenCalledWith('1', {
      name: 'Smith',
      cover: 'john@gmail.com',
    });
    expect(result).toStrictEqual(true);
  });

  test('deleteOne', async () => {
    const ds = new MongoDBArtistDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'deleteOne')
      .mockImplementation(() => Promise.resolve({ acknowledged: true }));
    const result = await ds.deleteOne('1');
    expect(mockDatabase.deleteOne).toHaveBeenCalledWith('1');
    expect(result).toStrictEqual(true);
  });
});
