import { Artist } from '../../entities/artist';
import { ArtistRepository } from '../../interfaces/repositories/artist-repository';
import { UpdateArtistUseCase } from '../../interfaces/use-cases/artist/update-artist';

export class UpdateArtist implements UpdateArtistUseCase {
  artistRepository: ArtistRepository;
  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }
  async execute(
    id: string,
    contact: Partial<Omit<Artist, 'id'>>
  ): Promise<boolean> {
    const result = await this.artistRepository.updateArtist(id, contact);
    return result;
  }
}
