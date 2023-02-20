import { Artist } from '../../../domain/entities/artist';

export interface ArtistDataSource {
  create(contact: Artist): Promise<boolean>;
  getAll(): Promise<Artist[]>;
  deleteOne(id: string): Promise<boolean>;
  updateOne(id: string, data: Object): Promise<boolean>;
}
