import { Song } from '../../entities/song';
import { SongRepository } from '../../interfaces/repositories/song-repository';
import { CreateSongUseCase } from '../../interfaces/use-cases/song/create-song';

export class CreateSong implements CreateSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }
  async execute(song: Song): Promise<boolean> {
    const result = await this.songRepository.createSong(song);
    return result;
  }
}
