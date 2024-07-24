import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Put('uploadimage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadimg (@Param('id', ParseUUIDPipe) id: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: "La imagen no puede pesar mas de 200kb"
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/
        })
      ]
    })
  ) file: Express.Multer.File) {
    return await this.filesService.updateImg(id, file)
  }

  
}
