import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Attachment } from "../../enterprise/entities/attachment";
import { AttachmentRepository } from "../repositories/attachment-repository";
import { Uploader } from "../storage/uploader";
import { InvalidAttachmentTypeError } from "./errors/invalid-attachment-type";

interface UploadAndCreateAttachmentRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  { attachment: Attachment }
>;

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    private readonly uploader: Uploader,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError());
    }

    const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    });

    const attachment = Attachment.create({
      title: fileName,
      link: url,
    });

    await this.attachmentRepository.createAttachment(attachment);

    return right({ attachment });
  }
}
