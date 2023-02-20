import { Song } from '../../../entities/song';

export interface UpdateSongUseCase {
  execute(id: string, data: Partial<Omit<Song, 'id'>>): Promise<boolean>;
}
