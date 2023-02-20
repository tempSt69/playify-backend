import express, { Request, Response } from 'express';
import { CreateArtistUseCase } from '../../domain/interfaces/use-cases/artist/create-artist';
import { DeleteArtistUseCase } from '../../domain/interfaces/use-cases/artist/delete-artist';
import { GetAllArtistUseCase } from '../../domain/interfaces/use-cases/artist/get-all-artist';
import { UpdateArtistUseCase } from '../../domain/interfaces/use-cases/artist/update-artist';
import {
  createArtistSchema,
  deleteArtistSchema,
  updateArtistSchema,
} from '../../schemas/artist-schema';
import validate from '../../schemas/validate';

export default function ArtistRouter(
  getAllArtistsUseCase: GetAllArtistUseCase,
  createArtistUseCase: CreateArtistUseCase,
  updateArtistUseCase: UpdateArtistUseCase,
  deleteArtistUseCase: DeleteArtistUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const artists = await getAllArtistsUseCase.execute();
      res.send(artists);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' });
    }
  });

  router.post(
    '/',
    validate(createArtistSchema),
    async (req: Request, res: Response) => {
      try {
        await createArtistUseCase.execute(req.body);
        res.statusCode = 201;
        res.send({ message: 'Created' });
      } catch (err: any) {
        res.status(500).send({ message: 'Error saving data' });
      }
    }
  );

  router.patch(
    '/:id',
    validate(updateArtistSchema),
    async (req: Request, res: Response) => {
      try {
        const result = await updateArtistUseCase.execute(
          req.params.id,
          req.body
        );
        res.statusCode = 201;
        res.send({ message: 'Updated', result });
      } catch (err: any) {
        res.status(500).send({ message: 'Error updating data' });
      }
    }
  );

  router.delete(
    '/:id',
    validate(deleteArtistSchema),
    async (req: Request, res: Response) => {
      try {
        const result = await deleteArtistUseCase.execute(req.params.id);
        res.statusCode = 201;
        res.send({ message: 'Deleted', result });
      } catch (err: any) {
        res.status(500).send({ message: 'Error deleting data' });
      }
    }
  );

  return router;
}
