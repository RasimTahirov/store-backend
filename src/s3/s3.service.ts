import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generatedName } from './utils/generated-name.utils';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      endpoint: configService.getOrThrow<string>('S3_ENDPOINT'),
      region: configService.getOrThrow<string>('S3_REGION'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('S3_ACCESS_KEY'),
        secretAccessKey: configService.getOrThrow<string>('S3_SECRET_KEY'),
      },
    });
    this.bucket = configService.getOrThrow<string>('S3_BUCKET_NAME');
  }

  public async upload(buffer: Buffer, key: string, mimetype: string) {
    const newFileName = generatedName(key);

    const command: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: newFileName,
      Body: buffer,
      ContentType: mimetype,
    };

    try {
      await this.client.send(new PutObjectCommand(command));
      const url = `${this.configService.getOrThrow<string>('S3_URL')}${newFileName}`;
      return url;
    } catch {
      throw new BadRequestException('Не удалось загрузить файл');
    }
  }
}
