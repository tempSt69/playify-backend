import server from './server';
import { MongoClient, ObjectId } from 'mongodb';
import { MongoDBArtistDataSource } from './data/data-sources/mongodb/mongodb-artist-data-source';
import { DatabaseWrapper } from './data/interfaces/data-sources/database-wrapper';
import { ArtistRepositoryImpl } from './domain/repositories/artist-repository';
import { CreateArtist } from './domain/use-cases/artist/create-artist';
import { GetAllArtists } from './domain/use-cases/artist/get-all-artist';
import ArtistRouter from './presentation/routers/artist-router';
import { UpdateArtist } from './domain/use-cases/artist/update-artist';
import { DeleteArtist } from './domain/use-cases/artist/delete-artist';

async function getMongoDS() {
  const uri =
    'mongodb+srv://antoine:fc8wtN67uTauzqlT@cluster0.ff7shgn.mongodb.net/?retryWrites=true&w=majority';

  const client = new MongoClient(uri);
  client.connect();
  const db = client.db('clean-archi');

  const artistDatabase: DatabaseWrapper = {
    find: (query) => db.collection('artists').find(query).toArray(),
    insertOne: (doc) => db.collection('artists').insertOne(doc),
    deleteOne: (id: string) =>
      db.collection('artists').deleteOne({ _id: new ObjectId(id) }),
    updateOne: (id: string, data: object) =>
      db
        .collection('artists')
        .updateOne({ _id: new ObjectId(id) }, { $set: data }),
  };

  return new MongoDBArtistDataSource(artistDatabase);
}
(async () => {
  const dataSource = await getMongoDS();

  const artistMiddleWare = ArtistRouter(
    new GetAllArtists(new ArtistRepositoryImpl(dataSource)),
    new CreateArtist(new ArtistRepositoryImpl(dataSource)),
    new UpdateArtist(new ArtistRepositoryImpl(dataSource)),
    new DeleteArtist(new ArtistRepositoryImpl(dataSource))
  );

  server.use('/artist', artistMiddleWare);
  server.listen(3000, () => console.log('Running on server'));
})();
