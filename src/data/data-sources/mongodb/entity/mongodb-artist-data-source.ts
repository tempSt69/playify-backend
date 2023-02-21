import { Db } from 'mongodb';
import { Artist } from '../../../../domain/entities/artist';
import { ArtistDataSource } from '../../../interfaces/data-sources/entity/artist-data-source';
import { NoSQLDatabaseWrapper } from '../../../interfaces/data-sources/nosql-database-wrapper';
import MongoDBHandler from '../mongodb';

export class MongoDBArtistDataSource implements ArtistDataSource {
  private database: NoSQLDatabaseWrapper;
  static collection = 'artists';

  constructor(database: NoSQLDatabaseWrapper) {
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

export function getArtistDatabase(db: Db): NoSQLDatabaseWrapper {
  return new MongoDBHandler(db, MongoDBArtistDataSource.collection);
}
