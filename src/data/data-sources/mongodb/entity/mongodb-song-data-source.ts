import { Db } from 'mongodb';
import MongoDBHandler from '../mongodb';

export class MongoDBSongDataSource extends MongoDBHandler {
  private searchField = 'name';
  private searchIndex = 'songIndex';
  private searchIndexText = 'songIndexText';

  constructor(db: Db) {
    super(db, 'songs');
  }

  search(searchString: string): Promise<any[]> {
    return super.search(searchString, this.searchField, this.searchIndex);
  }

  searchTest(searchString: string): Promise<any[]> {
    return super.search(searchString, this.searchField, this.searchIndexText);
  }
}
