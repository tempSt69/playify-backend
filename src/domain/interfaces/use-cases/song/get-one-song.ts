import { Song } from '../../../entities/song';

export interface GetOneSongUseCase {
  execute(id: string): Promise<Song>;
}
