export interface NoSQLDatabaseWrapper {
  getAll(): Promise<any[]>;
  find(query: object): Promise<any[]>;
  findOne(id: string): Promise<any>;
  findOneFilter(filter: object): Promise<any>;
  insertOne(doc: any): Promise<any>;
  updateOne(id: string, data: Object): Promise<any>;
  deleteOne(id: string): Promise<any>;
  search(
    searchString: string,
    searchField: string,
    searchIndex: string
  ): Promise<any[]>;
  searchIndex?: string;
  searchIndexText?: string;
  searchField?: string;
}
