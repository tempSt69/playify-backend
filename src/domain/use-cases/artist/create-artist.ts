import { Artist } from '../../entities/artist';
import { ArtistRepository } from '../../interfaces/repositories/artist-repository';
import { CreateArtistUseCase } from '../../interfaces/use-cases/artist/create-artist';

export class CreateArtist implements CreateArtistUseCase {
  artistRepository: ArtistRepository;
  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }
  async execute(artist: Artist): Promise<boolean> {
    const result = await this.artistRepository.createArtist(artist);
    return result;
  }
}
