import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  create(createUserDto: UserDto) {
    const newUserID = this.usersRepository.createUser(createUserDto)
    return newUserID;
  }

  findAll() {
    return this.usersRepository.getUsers();
  }

  findOneById(id: number) {
    const user = this.usersRepository.getUserById(id);
    return user;
  }

  update(id: number, UserDto: UserDto) {
    const userUpdatedId = this.usersRepository.updateUser(UserDto, id)
    return {
			message: "Usuario actualizado con exito",
			userUpdatedId
		};
  }

  remove(id: number) {
		const userRemovedId = this.usersRepository.removeUser(id)
    return {
			message: "Usuario eliminado con exito",
			userRemovedId
		};
  }

	queryParamsLimitPage (limit: string, page:string){
		this.usersRepository.queryParamsLimitAndPage(limit, page)
	}
}