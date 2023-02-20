import { Song } from '../../../entities/song';

export interface FindSongUseCase {
  execute(song: Partial<Song>): Promise<Song[]>;
}
