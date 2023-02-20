import { Song } from '../../../entities/song';

export interface FindSongUseCase {
  execute(song: Partial<Omit<Song, 'id'>>): Promise<Song[]>;
}
