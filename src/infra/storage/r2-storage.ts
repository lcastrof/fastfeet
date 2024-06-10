import {
  UploadParams,
  Uploader,
} from "@/domain/delivery/application/storage/uploader";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";
import { Env } from "../env";

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  constructor(private envService: ConfigService<Env>) {
    const accountId = envService.get("CLOUDFARE_ACCOUNT_ID");

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: envService.get("AWS_ACCESS_KEY_ID")!,
        secretAccessKey: envService.get("AWS_SECRET_ACCESS_KEY")!,
      },
    });
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get("AWS_BUCKET_NAME"),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return {
      url: uniqueFileName,
    };
  }
}
