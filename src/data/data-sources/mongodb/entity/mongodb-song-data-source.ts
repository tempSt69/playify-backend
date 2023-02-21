import { Song } from '../../../../domain/entities/song';
import { SongDataSource } from '../../../interfaces/data-sources/entity/song-data-source';
import { NoSQLDatabaseWrapper } from '../../../interfaces/data-sources/nosql-database-wrapper';
import { Db, ObjectId } from 'mongodb';
import MongoDBHandler from '../mongodb';

export class MongoDBSongDataSource implements SongDataSource {
  private database: NoSQLDatabaseWrapper;
  static collection = 'songs';
  constructor(database: NoSQLDatabaseWrapper) {
    this.database = database;
  }
  async getOne(id: string): Promise<Song | undefined> {
    const item = await this.database.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return undefined;
    }
    return {
      id: item._id.toString(),
      name: item.name,
      trackUrl: item.trackUrl,
      artistId: item.artistId,
      duration: item.duration,
    };
  }
  async find(song: Partial<Omit<Song, 'id'>>): Promise<Song[]> {
    const result = await this.database.find({ $or: { ...song } });
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      trackUrl: item.trackUrl,
      artistId: item.artistId,
      duration: item.duration,
    }));
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.database.deleteOne(id);
    return result !== null;
  }
  async updateOne(id: string, data: Object): Promise<boolean> {
    const result = await this.database.updateOne(id, data);
    return result !== null;
  }
  async create(contact: Song): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null;
  }
  async getAll(): Promise<Song[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      trackUrl: item.trackUrl,
      artistId: item.artistId,
      duration: item.duration,
    }));
  }
}
export function getSongDatabase(db: Db): NoSQLDatabaseWrapper {
  return new MongoDBHandler(db, MongoDBSongDataSource.collection);
}
