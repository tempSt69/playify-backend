import { Artist } from '../entities/artist';
import { ArtistRepository } from '../interfaces/repositories/artist-repository';
import { GetAllArtistUseCase } from '../interfaces/use-cases/artist/get-all-artist';

export class GetAllArtists implements GetAllArtistUseCase {
  artistRepository: ArtistRepository;
  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }

  async execute(): Promise<Artist[]> {
    const result = await this.artistRepository.getArtists();
    return result;
  }
}
