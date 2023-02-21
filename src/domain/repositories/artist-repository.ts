import { ArtistDataSource } from '../../data/interfaces/data-sources/entity/artist-data-source';
import { Artist } from '../entities/artist';
import { ArtistRepository } from '../interfaces/repositories/artist-repository';

export class ArtistRepositoryImpl implements ArtistRepository {
  artistDataSource: ArtistDataSource;

  constructor(artistDataSource: ArtistDataSource) {
    this.artistDataSource = artistDataSource;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const result = await this.artistDataSource.deleteOne(id);
    return result;
  }

  async updateArtist(id: string, artist: Artist): Promise<boolean> {
    const result = await this.artistDataSource.updateOne(id, artist);
    return result;
  }

  async createArtist(artist: Artist): Promise<boolean> {
    const result = await this.artistDataSource.create(artist);
    return result;
  }

  async getArtists(): Promise<Artist[]> {
    const result = await this.artistDataSource.getAll();
    return result;
  }
}
