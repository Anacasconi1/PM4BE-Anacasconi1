import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/Product.entity';
import { CloudinaryConnection } from 'src/config/cloudinary';
import { FilesRepository } from './files.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConnection, FilesRepository],
})
export class FilesModule {}
