import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async findAll(limit: number, page: number){
    const users = await this.userRepository.find({relations: {
      orders: true
    }});
    const response = this.queryParamsLimitPage(Number(limit), Number(page), users)    
    return response
  }

  async findOneById(id: string): Promise< any > {
    const userbyid = await this.userRepository.findOne({where: {
      id: id
    }, relations: {
      orders:true
    }})
    if(userbyid) {
      return {message: "Usuario creado con exito", 
              userbyid
              }
    }else {
      return {message: "usuario no encontrado"}
    }
    
  }

  DeleteUser(id: string) {
    const userRemovedId = this.userRepository.delete(id)
    return {
			message: "Usuario eliminado con exito",
			userRemovedId
		};
  }
  UpdateUser(id: string, UserDto: UserDto) {
    const userUpdatedId = this.userRepository.update(id, UserDto)
    return {
			message: "Usuario actualizado con exito",
			userUpdatedId
		};
  }

	queryParamsLimitPage (limit: number, page:number, users: User[]){
    if(!limit){
      limit = 5
    }
    if (!page){
      page = 1
    }
		const start = (page - 1) * limit;
    const end = start + limit
    users = users.slice(start, end);    
    return users
	}
}
