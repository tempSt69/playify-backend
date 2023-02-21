import { Db, GridFSBucket, MongoClient } from 'mongodb';
import { NoSQLDatabaseWrapper } from '../../interfaces/data-sources/nosql-database-wrapper';
import {
  getArtistDatabase,
  MongoDBArtistDataSource,
} from './entity/mongodb-artist-data-source';
import {
  getSongDatabase,
  MongoDBSongDataSource,
} from './entity/mongodb-song-data-source';

export async function getMongoDB() {
  const uri = process.env.ATLAS_URI!;

  const client = new MongoClient(uri);
  client.connect();
  const db = client.db('clean-archi');
  return db;
}
export async function getMongoDS(db: Db) {
  const artistDatabase: NoSQLDatabaseWrapper = getArtistDatabase(db);
  const songDatabase: NoSQLDatabaseWrapper = getSongDatabase(db);

  return [
    new MongoDBArtistDataSource(artistDatabase),
    new MongoDBSongDataSource(songDatabase),
  ];
}
export async function getMongoBucket() {
  const db = await getMongoDB();
  return new GridFSBucket(db);
}
