import { ArtistRepositoryImpl } from '../../domain/repositories/artist-repository';
import { CreateArtist } from '../../domain/use-cases/artist/create-artist';
import { DeleteArtist } from '../../domain/use-cases/artist/delete-artist';
import { GetAllArtists } from '../../domain/use-cases/artist/get-all-artist';
import { UpdateArtist } from '../../domain/use-cases/artist/update-artist';
import ArtistRouter from '../routers/artist-router';

export function getArtistMiddleware(dataSource: any) {
  return ArtistRouter(
    new GetAllArtists(new ArtistRepositoryImpl(dataSource)),
    new CreateArtist(new ArtistRepositoryImpl(dataSource)),
    new UpdateArtist(new ArtistRepositoryImpl(dataSource)),
    new DeleteArtist(new ArtistRepositoryImpl(dataSource))
  );
}
