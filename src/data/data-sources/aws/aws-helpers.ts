import { Response } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import s3Storage from 'multer-s3';

const AWS_KEY = process.env.AWS_ACCESS_KEY_ID!;
const AWS_SECRET = process.env.AWS_SECRET_ACCESS_KEY!;
const AWS_BUCKET = process.env.AWS_BUCKET_NAME!;
const AWS_REGION = process.env.AWS_REGION_NAME;

export type MulterFile = File & {
  key: string;
  location: string;
  mimetype: string;
};

export default function s3Helpers() {
  const s3 = new S3Client({
    credentials: { accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET },
    region: AWS_REGION,
  });

  const stream = (trackUrl: string, res: Response) => {
    const awsS3 = new AWS.S3({
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET,
    });
    const params = {
      Bucket: AWS_BUCKET!,
      Key: `${trackUrl}`,
    };
    awsS3.headObject(params, function (err, data: AWS.S3.HeadObjectOutput) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting file from S3' });
      }
      var stream = awsS3.getObject(params).createReadStream();

      stream.on('error', function error(err) {
        res.status(500).send({ message: 'Error streaming file from S3' });
      });

      res.set('Content-Type', data.ContentType);
      res.set('Content-Length', data.ContentLength?.toString());
      res.set('ETag', data.ETag);

      stream.on('end', () => {
        console.log('Served by Amazon S3 file');
      });
      stream.pipe(res);
    });
  };

  const storage = s3Storage({
    s3,
    bucket: AWS_BUCKET,
    contentType: s3Storage.AUTO_CONTENT_TYPE,
  });

  return { s3, stream, storage };
}
