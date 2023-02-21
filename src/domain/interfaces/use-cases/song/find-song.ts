import { Song } from '../../../entities/song';

export interface FindSongUseCase {
  execute(searchString: string): Promise<Song[]>;
}
