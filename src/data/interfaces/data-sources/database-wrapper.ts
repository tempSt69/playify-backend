export interface DatabaseWrapper {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
  updateOne(id: string, data: Object): Promise<any>;
  deleteOne(id: string): Promise<any>;
}
