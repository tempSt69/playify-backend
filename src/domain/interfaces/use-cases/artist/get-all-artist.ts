import { Artist } from '../../../entities/artist';

export interface GetAllArtistUseCase {
  execute(): Promise<Artist[]>;
}
