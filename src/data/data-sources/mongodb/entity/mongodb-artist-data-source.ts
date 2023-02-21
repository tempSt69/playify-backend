import { Db } from 'mongodb';
import MongoDBHandler from '../mongodb';

export class MongoDBArtistDataSource extends MongoDBHandler {
  constructor(db: Db) {
    super(db, 'artists');
  }
}
