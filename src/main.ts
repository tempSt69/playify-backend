import server from './server';
require('dotenv').config();
import { MongoClient } from 'mongodb';
import {
  getArtistDatabase,
  MongoDBArtistDataSource,
} from './data/data-sources/mongodb/mongodb-artist-data-source';
import {
  getSongDatabase,
  MongoDBSongDataSource,
} from './data/data-sources/mongodb/mongodb-song-data-source';
import { DatabaseWrapper } from './data/interfaces/data-sources/database-wrapper';
import { getArtistMiddleware } from './presentation/middlewares/artist-middleware';
import { getSongMiddleware } from './presentation/middlewares/song-middleware';

async function getMongoDS() {
  const uri = process.env.ATLAS_URI!;

  const client = new MongoClient(uri);
  client.connect();
  const db = client.db('clean-archi');

  const artistDatabase: DatabaseWrapper = getArtistDatabase(db);
  const songDatabase: DatabaseWrapper = getSongDatabase(db);

  return [
    new MongoDBArtistDataSource(artistDatabase),
    new MongoDBSongDataSource(songDatabase),
  ];
}
(async () => {
  const [dataSourceArtist, dataSourceSong] = await getMongoDS();

  const artistMiddleware = getArtistMiddleware(dataSourceArtist);
  const songMiddleware = getSongMiddleware(dataSourceSong);

  server.use('/artist', artistMiddleware);
  server.use('/song', songMiddleware);

  server.listen(3000, () => console.log('Running on server'));
})();
