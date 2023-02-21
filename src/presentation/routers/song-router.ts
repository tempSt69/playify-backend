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
  streamSongSchema,
  updateSongSchema,
} from '../../schemas/song-schema';
import validate from '../../schemas/validate';
import upload from '../upload/multer';
import { Song } from '../../domain/entities/song';
import { getMongoBucket } from '../../data/data-sources/mongodb/mongodb-helpers';
import { ObjectId } from 'mongodb';

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
    '/:fileName/stream',
    validate(streamSongSchema),
    async (req: Request, res: Response) => {
      try {
        const bucket = await getMongoBucket();
        res.status(200);
        res.set({
          'Content-Type': 'audio/mpeg',
          'Transfer-Encoding': 'chunked',
        });
        bucket.openDownloadStreamByName(req.params.fileName).pipe(res);
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error fetching dataaa' });
      }
    }
  );

  router.get(
    '/search/:searchString',
    validate(findSongSchema),
    async (req: Request, res: Response) => {
      try {
        const fields: Partial<Omit<Song, 'id'>> = {
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
    upload.single('song'),
    async (req: Request, res: Response) => {
      try {
        if (!req.file?.filename) {
          res.status(400).send('File not uploaded');
          return;
        }

        const song = {
          ...req.body,
          trackUrl: req.file.filename,
        };
        await createSongUseCase.execute(song);
        res.statusCode = 201;
        res.send({ message: 'Created' });
      } catch (err: any) {
        console.log(err.message, 'error');

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
