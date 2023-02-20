import { ArtistRepository } from '../../interfaces/repositories/artist-repository';
import { DeleteArtistUseCase } from '../../interfaces/use-cases/artist/delete-artist';

export class DeleteArtist implements DeleteArtistUseCase {
  artistRepository: ArtistRepository;
  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }
  async execute(id: string): Promise<boolean> {
    const result = await this.artistRepository.deleteArtist(id);
    return result;
  }
}
