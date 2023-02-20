import { Song } from '../../../domain/entities/song';

export interface SongDataSource {
  create(song: Song): Promise<boolean>;
  getAll(): Promise<Song[]>;
  getOne(id: string): Promise<Song>;
  find(song: Partial<Song>): Promise<Song[]>;
  deleteOne(id: string): Promise<boolean>;
  updateOne(id: string, data: Object): Promise<boolean>;
}
