export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>;
  findOne(id: object): Promise<any>;
  insertOne(doc: any): Promise<any>;
  updateOne(id: string, data: Object): Promise<any>;
  deleteOne(id: string): Promise<any>;
}
