import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  createUser(createUser) {
    const newUserID = this.userRepository.save(createUser)
    return newUserID;
  }

  async findAll() {
    return await this.userRepository.find({relations: {
      orders: true
    }});
  }

  findOneById(id) {
    const user = this.userRepository.findOne({where: {
      id: id
    }, relations: {
      orders:true
    }})
    console.log(user);
    
  }

  // update(id: number, UserDto: UserDto) {
  //   const userUpdatedId = this.usersRepository.updateUser(UserDto, id)
  //   return {
	// 		message: "Usuario actualizado con exito",
	// 		userUpdatedId
	// 	};
  // }

  // remove(id: number) {
	// 	const userRemovedId = this.usersRepository.removeUser(id)
  //   return {
	// 		message: "Usuario eliminado con exito",
	// 		userRemovedId
	// 	};
  // }

	// queryParamsLimitPage (limit: number, page:number){
	// 	this.usersRepository.queryParamsLimitAndPage(limit, page)
	// }
}
