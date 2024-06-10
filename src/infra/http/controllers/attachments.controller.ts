import { InvalidAttachmentTypeError } from "@/domain/delivery/application/use-cases/errors/invalid-attachment-type";
import { UploadAndCreateAttachmentUseCase } from "@/domain/delivery/application/use-cases/upload-and-create-attachment";
import { Role } from "@/infra/enums/role.enum";
import { Roles } from "@/infra/roles/roles.decorator";
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/attachments")
@Roles(Role.Admin, Role.Deliveryman)
export class AttachmentsController {
  constructor(
    private readonly uploadAndCreateAttachmentUseCase: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @HttpCode(201)
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: ".(png|jpg|jpeg|pdf)" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachmentUseCase.execute({
      fileType: file.mimetype,
      fileName: file.originalname,
      body: file.buffer,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { attachment } = result.value;

    return {
      attachmentId: attachment.id.toString(),
    };
  }
}
