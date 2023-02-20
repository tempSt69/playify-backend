import { SongRepositoryImpl } from '../../domain/repositories/song-repository';
import { CreateSong } from '../../domain/use-cases/song/create-song';
import { DeleteSong } from '../../domain/use-cases/song/delete-song';
import { FindSong } from '../../domain/use-cases/song/find-song';
import { GetAllSong } from '../../domain/use-cases/song/get-all-song';
import { GetOneSong } from '../../domain/use-cases/song/get-one-song';
import { UpdateSong } from '../../domain/use-cases/song/update-song';
import SongRouter from '../routers/song-router';

export function getSongMiddleware(dataSource: any) {
  return SongRouter(
    new GetAllSong(new SongRepositoryImpl(dataSource)),
    new CreateSong(new SongRepositoryImpl(dataSource)),
    new UpdateSong(new SongRepositoryImpl(dataSource)),
    new DeleteSong(new SongRepositoryImpl(dataSource)),
    new GetOneSong(new SongRepositoryImpl(dataSource)),
    new FindSong(new SongRepositoryImpl(dataSource))
  );
}
