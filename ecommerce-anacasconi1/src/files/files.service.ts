import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/Product.entity';
import { Repository } from 'typeorm';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private filesRepository: FilesRepository
  ) {}
  

  async updateImg(id:string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOne({where: {
      id
    }})
    if(!product) {
      throw new NotFoundException({message: "No se pudo encontrar el producto, verifica el id"})
    }else {
      const newimgUrl = (await this.filesRepository.uploadImg(file)).secure_url; 
      await this.productsRepository.update(id, {imgUrl: newimgUrl})
      return {message: "La imagen del producto se ha actualizado con exito"}
    }
  }
}
