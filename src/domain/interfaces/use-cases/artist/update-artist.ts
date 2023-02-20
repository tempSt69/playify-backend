import { Artist } from '../../../entities/artist';

export interface UpdateArtistUseCase {
  execute(id: string, data: Partial<Omit<Artist, 'id'>>): Promise<boolean>;
}
