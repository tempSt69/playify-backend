import { Song } from '../../entities/song';
import { SongRepository } from '../../interfaces/repositories/song-repository';
import { UpdateSongUseCase } from '../../interfaces/use-cases/song/update-song';

export class UpdateSong implements UpdateSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }
  async execute(
    id: string,
    contact: Partial<Omit<Song, 'id'>>
  ): Promise<boolean> {
    const result = await this.songRepository.updateSong(id, contact);
    return result;
  }
}
