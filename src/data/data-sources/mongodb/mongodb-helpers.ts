import { Db, GridFSBucket, MongoClient } from 'mongodb';
import { MongoDBArtistDataSource } from './entity/mongodb-artist-data-source';
import { MongoDBSongDataSource } from './entity/mongodb-song-data-source';

export function getMongoDBTest() {
  const uri = process.env.ATLAS_URI!;

  const client = new MongoClient(uri);
  client.connect();
  const db = client.db('tests');
  return db;
}

export async function getMongoDB() {
  const uri = process.env.ATLAS_URI!;

  const client = new MongoClient(uri);
  client.connect();
  const db = client.db('clean-archi');
  return db;
}
export async function getMongoDS(db: Db) {
  return [new MongoDBArtistDataSource(db), new MongoDBSongDataSource(db)];
}
export async function getMongoBucket() {
  const db = await getMongoDB();
  return new GridFSBucket(db);
}
