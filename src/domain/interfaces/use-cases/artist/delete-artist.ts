import { Artist } from '../../../entities/artist';

export interface DeleteArtistUseCase {
  execute(id: string): Promise<boolean>;
}
