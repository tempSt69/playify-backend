import { Song } from '../../entities/song';
import { SongRepository } from '../../interfaces/repositories/song-repository';
import { GetOneSongUseCase } from '../../interfaces/use-cases/song/get-one-song';

export class GetOneSong implements GetOneSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(id: string): Promise<Song | undefined> {
    const result = await this.songRepository.getOneSong(id);
    return result;
  }
}
