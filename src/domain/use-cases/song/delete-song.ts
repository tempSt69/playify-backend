import { SongRepository } from '../../interfaces/repositories/song-repository';
import { DeleteSongUseCase } from '../../interfaces/use-cases/song/delete-song';

export class DeleteSong implements DeleteSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }
  async execute(id: string): Promise<boolean> {
    const result = await this.songRepository.deleteSong(id);
    return result;
  }
}
