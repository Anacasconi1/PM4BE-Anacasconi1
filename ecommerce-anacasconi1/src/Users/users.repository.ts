import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'Sincere@april.biz',
      name: 'Leanne Graham',
      password: 'ofsw54564',
      address: 'Kulas Light Apt.658',
      phone: '1-770-736-8031 x56442',
      city: 'Gwenborough',
      country: 'Belgica',
    },
    {
      id: 2,
      email: 'kjga@april.biz',
      name: 'Jane Doe',
      password: 'sg465fgvd',
      address: 'Victor Plains 89',
      phone: '010-692-6593 x09125',
      city: 'South Elvis',
      country: 'Alemania',
    },
    {
      id: 3,
      email: 'maria@mail.biz',
      name: 'Maria lopez',
      password: 'df546d',
      address: 'Calle siempre viva 123',
      phone: '0303456',
    },
    {
      id: 4,
      email: 'leo123@champ.colombiatucasa',
      name: 'Lionel Andres Messi',
      password: 'afma4',
      address: 'Calle bicampeon 4',
      phone: '0800alloraralcampito',
      country: 'Argentina',
    },
  ];

  filterForPassword(userWP: User) {
    const user = {
      id: userWP.id,
      email: userWP.email,
      name: userWP.name,
      phone: userWP.phone,
      address: userWP.address,
      city: userWP.city,
      country: userWP.country,
    };
    return user;
  }
  getUsersComplete() {
    return this.users;
  }

  getUsers(limit: number, page: number) {
    const response = this.users.map((user) => this.filterForPassword(user));
    const start = (page - 1) * limit;
    const end = start / limit;
    const sliced = response.slice(start, end);
    return sliced;
  }

  getUserById(id) {
    const usersarr = this.users;
    const user = usersarr.find((user) => user.id === id);
    const response = this.filterForPassword(user);
    return response;
  }

  createUser(user: UserDto) {
    const id = this.users.length + 1;
    this.users.push({ id, ...user });
    return {
      message: 'usuario creado con exito',
      id,
    };
  }

  updateUser(newUser: UserDto, id: number) {
    const user = this.users.find((user) => user.id === id);
    user.email = newUser.email;
    user.name = newUser.name;
    user.phone = newUser.phone;
    user.password = newUser.password;
    user.address = newUser.address;
    user.city = newUser.city;
    user.country = newUser.country;
    return id;
  }

  removeUser(id: number) {
    this.users.filter((user) => user.id !== id);
    return id;
  }

  queryParamsLimitAndPage(limit: number, page: number) {
    if (!page) {
      page = 1;
    } else if (!limit) {
      limit = 5;
    }
  }
}
