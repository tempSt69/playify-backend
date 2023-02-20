import { Song } from '../../../domain/entities/song';
import { SongDataSource } from '../../interfaces/data-sources/song-data-source';
import { DatabaseWrapper } from '../../interfaces/data-sources/database-wrapper';

export class MongoDBSongDataSource implements SongDataSource {
  private database: DatabaseWrapper;
  constructor(database: DatabaseWrapper) {
    this.database = database;
  }
  async getOne(id: string): Promise<Song> {
    const result = await this.database.findOne(id);
    return result;
  }
  async find(song: Partial<Song>): Promise<Song[]> {
    const result = await this.database.find(song);
    return result;
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
