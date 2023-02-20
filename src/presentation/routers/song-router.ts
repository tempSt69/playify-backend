import express, { Request, Response } from 'express';
import { CreateSongUseCase } from '../../domain/interfaces/use-cases/song/create-song';
import { DeleteSongUseCase } from '../../domain/interfaces/use-cases/song/delete-song';
import { GetAllSongUseCase } from '../../domain/interfaces/use-cases/song/get-all-song';
import { UpdateSongUseCase } from '../../domain/interfaces/use-cases/song/update-song';
import { GetOneSongUseCase } from '../../domain/interfaces/use-cases/song/get-one-song';
import { FindSongUseCase } from '../../domain/interfaces/use-cases/song/find-song';
import {
  createSongSchema,
  deleteSongSchema,
  findSongSchema,
  getOneSongSchema,
  updateSongSchema,
} from '../../schemas/song-schema';
import validate from '../../schemas/validate';

export default function SongRouter(
  getAllSongsUseCase: GetAllSongUseCase,
  createSongUseCase: CreateSongUseCase,
  updateSongUseCase: UpdateSongUseCase,
  deleteSongUseCase: DeleteSongUseCase,
  getOneSongUseCase: GetOneSongUseCase,
  findSongUseCase: FindSongUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const songs = await getAllSongsUseCase.execute();
      res.send(songs);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' });
    }
  });

  router.get(
    '/:id',
    validate(getOneSongSchema),
    async (req: Request, res: Response) => {
      try {
        const song = await getOneSongUseCase.execute(req.params.id);
        res.send(song);
      } catch (err) {
        res.status(500).send({ message: 'Error fetching data' });
      }
    }
  );

  router.get(
    '/search/:searchString',
    validate(findSongSchema),
    async (req: Request, res: Response) => {
      try {
        const fields = {
          name: req.params.searchString,
          artistId: req.params.searchString,
        };
        const songs = await findSongUseCase.execute(fields);
        res.send(songs);
      } catch (err) {
        res.status(500).send({ message: 'Error fetching data' });
      }
    }
  );

  router.post(
    '/',
    validate(createSongSchema),
    async (req: Request, res: Response) => {
      try {
        await createSongUseCase.execute(req.body);
        res.statusCode = 201;
        res.send({ message: 'Created' });
      } catch (err: any) {
        res.status(500).send({ message: 'Error saving data' });
      }
    }
  );

  router.patch(
    '/:id',
    validate(updateSongSchema),
    async (req: Request, res: Response) => {
      try {
        const result = await updateSongUseCase.execute(req.params.id, req.body);
        res.statusCode = 201;
        res.send({ message: 'Updated', result });
      } catch (err: any) {
        res.status(500).send({ message: 'Error updating data' });
      }
    }
  );

  router.delete(
    '/:id',
    validate(deleteSongSchema),
    async (req: Request, res: Response) => {
      try {
        const result = await deleteSongUseCase.execute(req.params.id);
        res.statusCode = 201;
        res.send({ message: 'Deleted', result });
      } catch (err: any) {
        res.status(500).send({ message: 'Error deleting data' });
      }
    }
  );

  return router;
}