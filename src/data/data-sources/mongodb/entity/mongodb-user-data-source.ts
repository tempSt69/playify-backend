import { Db } from 'mongodb';
import MongoDBHandler from '../mongodb';

export class MongoDBUserDataSource extends MongoDBHandler {
  constructor(db: Db) {
    super(db, 'users');
  }
}
