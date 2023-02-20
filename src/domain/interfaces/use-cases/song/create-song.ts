import { Song } from '../../../entities/song';

export interface CreateSongUseCase {
  execute(song: Song): Promise<boolean>;
}
