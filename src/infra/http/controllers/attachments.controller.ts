import { Role } from "@/infra/enums/role.enum";
import { Roles } from "@/infra/roles/roles.decorator";
import {
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
  constructor() {}

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
    console.log(file);
  }
}
