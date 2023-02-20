import { Artist } from '../../entities/artist';

export interface ArtistRepository {
  createArtist(artist: Artist): Promise<boolean>;
  updateArtist(
    id: string,
    artist: Partial<Omit<Artist, 'id'>>
  ): Promise<boolean>;
  getArtists(): Promise<Artist[]>;
  deleteArtist(id: string): Promise<boolean>;
}
