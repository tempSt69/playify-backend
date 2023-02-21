import { SongDataSource } from '../../data/interfaces/data-sources/entity/song-data-source';
import { Song } from '../entities/song';
import { SongRepository } from '../interfaces/repositories/song-repository';

export class SongRepositoryImpl implements SongRepository {
  songDataSource: SongDataSource;

  constructor(songDataSource: SongDataSource) {
    this.songDataSource = songDataSource;
  }

  async getAllSong(): Promise<Song[]> {
    const result = await this.songDataSource.getAll();
    return result;
  }

  async getOneSong(id: string): Promise<Song | undefined> {
    const result = await this.songDataSource.getOne(id);
    return result;
  }

  async findSong(song: Partial<Omit<Song, 'id'>>): Promise<Song[]> {
    const result = await this.songDataSource.find(song);
    return result;
  }

  async createSong(song: Song): Promise<boolean> {
    const result = await this.songDataSource.create(song);
    return result;
  }

  async updateSong(id: string, song: Song): Promise<boolean> {
    const result = await this.songDataSource.updateOne(id, song);
    return result;
  }

  async deleteSong(id: string): Promise<boolean> {
    const result = await this.songDataSource.deleteOne(id);
    return result;
  }
}
