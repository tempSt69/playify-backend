import server from './server';
require('dotenv').config();
import { getArtistMiddleware } from './presentation/middlewares/artist-middleware';
import { getSongMiddleware } from './presentation/middlewares/song-middleware';
import { getUserMiddleware } from './presentation/middlewares/user-middleware';
import {
  getMongoDB,
  getMongoDS,
} from './data/data-sources/mongodb/mongodb-helpers';

export async function getBucket() {}
(async () => {
  const db = await getMongoDB();
  const [dataSourceArtist, dataSourceSong, dataSourceUser] = await getMongoDS(
    db
  );

  const artistMiddleware = getArtistMiddleware(dataSourceArtist);
  const songMiddleware = getSongMiddleware(dataSourceSong);
  const userMiddleware = getUserMiddleware(dataSourceUser);

  server.use('/artist', artistMiddleware);
  server.use('/song', songMiddleware);
  server.use('/user', userMiddleware);

  server.listen(3000, () => console.log('Running on server'));
})();
