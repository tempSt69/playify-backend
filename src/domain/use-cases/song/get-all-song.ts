import { Song } from '../../entities/song';
import { SongRepository } from '../../interfaces/repositories/song-repository';
import { GetAllSongUseCase } from '../../interfaces/use-cases/song/get-all-song';

export class GetAllSong implements GetAllSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(): Promise<Song[]> {
    const result = await this.songRepository.getAllSong();
    return result;
  }
}
