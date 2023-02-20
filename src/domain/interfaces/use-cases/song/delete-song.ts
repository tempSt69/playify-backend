import { Song } from '../../../entities/song';

export interface DeleteSongUseCase {
  execute(id: string): Promise<boolean>;
}
