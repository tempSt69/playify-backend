import { Song } from '../../../entities/song';

export interface GetAllSongUseCase {
  execute(): Promise<Song[]>;
}
