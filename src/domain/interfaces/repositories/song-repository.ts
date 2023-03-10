import { Song } from '../../entities/song';

export interface SongRepository {
  createSong(song: Song): Promise<boolean>;
  updateSong(id: string, song: Partial<Omit<Song, 'id'>>): Promise<boolean>;
  getAllSong(): Promise<Song[]>;
  getOneSong(id: string): Promise<Song | undefined>;
  findSong(searchString: string): Promise<Song[]>;
  deleteSong(id: string): Promise<boolean>;
}
