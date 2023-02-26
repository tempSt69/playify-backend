import { Db, ObjectId } from 'mongodb';
import { NoSQLDatabaseWrapper } from '../../interfaces/data-sources/nosql-database-wrapper';

export default class MongoDBHandler implements NoSQLDatabaseWrapper {
  private db: Db;
  private collection: string;
  constructor(db: Db, collection: string) {
    this.db = db;
    this.collection = collection;
  }
  search(
    searchString: string,
    searchField: string,
    searchIndex: string
  ): Promise<any[]> {
    return this.db
      .collection(this.collection)
      .aggregate([
        {
          $search: {
            index: searchIndex,
            autocomplete: {
              query: searchString,
              path: searchField,
            },
          },
        },
      ])
      .toArray();
  }
  find(query: object): Promise<any[]> {
    return this.db.collection(this.collection).find(query).toArray();
  }
  getAll(): Promise<any[]> {
    return this.find({});
  }
  findOne(id: string): Promise<any> {
    return this.db
      .collection(this.collection)
      .findOne({ _id: new ObjectId(id) });
  }
  findOneFilter(filter: object): Promise<any> {
    return this.db.collection(this.collection).findOne(filter);
  }
  async insertOne(doc: any): Promise<any> {
    const result = await this.db.collection(this.collection).insertOne(doc);
    return result.acknowledged;
  }
  async updateOne(id: string, data: Object): Promise<any> {
    const result = await this.db
      .collection(this.collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return result.acknowledged && result.matchedCount === 1;
  }
  async deleteOne(id: string): Promise<any> {
    const result = await this.db
      .collection(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
    return result.acknowledged && result.deletedCount === 1;
  }
}
