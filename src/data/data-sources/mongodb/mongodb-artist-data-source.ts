import { Db, ObjectId } from 'mongodb';
import { Artist } from '../../../domain/entities/artist';
import { ArtistDataSource } from '../../interfaces/data-sources/artist-data-source';
import { DatabaseWrapper } from '../../interfaces/data-sources/database-wrapper';
import MongoDBHandler from './mongodb';

export class MongoDBArtistDataSource implements ArtistDataSource {
  private database: DatabaseWrapper;
  static collection = 'artists';

  constructor(database: DatabaseWrapper) {
    this.database = database;
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.database.deleteOne(id);
    return result !== null;
  }
  async updateOne(id: string, data: Object): Promise<boolean> {
    const result = await this.database.updateOne(id, data);
    return result !== null;
  }
  async create(contact: Artist): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null;
  }
  async getAll(): Promise<Artist[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      cover: item.cover,
    }));
  }
}

export function getArtistDatabase(db: Db): DatabaseWrapper {
  return new MongoDBHandler(db, MongoDBArtistDataSource.collection);
}
