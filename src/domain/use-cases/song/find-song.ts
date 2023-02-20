import { Song } from '../../entities/song';
import { SongRepository } from '../../interfaces/repositories/song-repository';
import { FindSongUseCase } from '../../interfaces/use-cases/song/find-song';

export class FindSong implements FindSongUseCase {
  songRepository: SongRepository;
  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(song: Partial<Omit<Song, 'id'>>): Promise<Song[]> {
    const result = await this.songRepository.findSong(song);
    return result;
  }
}
