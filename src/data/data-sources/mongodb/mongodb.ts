import { Db, ObjectId } from 'mongodb';
import { DatabaseWrapper } from '../../interfaces/data-sources/database-wrapper';

export default class MongoDBHandler implements DatabaseWrapper {
  private db: Db;
  private collection: string;
  constructor(db: Db, collection: string) {
    this.db = db;
    this.collection = collection;
  }
  find(query: object): Promise<any[]> {
    return this.db.collection(this.collection).find(query).toArray();
  }
  findOne(id: object): Promise<any> {
    return this.db.collection(this.collection).findOne(id);
  }
  insertOne(doc: any): Promise<any> {
    return this.db.collection(this.collection).insertOne(doc);
  }
  updateOne(id: string, data: Object): Promise<any> {
    return this.db
      .collection(this.collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
  }
  deleteOne(id: string): Promise<any> {
    return this.db
      .collection(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
  }
}
