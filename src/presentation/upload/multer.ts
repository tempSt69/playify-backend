import multer from 'multer';
import s3Helpers from '../../data/data-sources/aws/aws-helpers';
// import { GridFsStorage } from 'multer-gridfs-storage';

// const storage = new GridFsStorage({ url: process.env.ATLAS_URI! });

const { storage } = s3Helpers();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'audio') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default upload;
