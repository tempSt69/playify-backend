import { Artist } from '../../../entities/artist';

export interface CreateArtistUseCase {
  execute(artist: Artist): Promise<boolean>;
}
