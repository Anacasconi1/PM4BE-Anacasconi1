import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(private usersRepository: UsersRepository) {}

  private allUsers = this.usersRepository.getUsersComplete();
  usersCredential() {
    const AllCredentials: Auth [] = this.allUsers.map((user) => {
      const credentials: Auth = {
        email: user.email,
        password: user.password
      };
      return credentials
    });
    return AllCredentials
  }

  private auths: Auth[] = this.usersCredential();

  SignInCredentials ({email, password}) {
        if (email && password) {
        const credentialFinder = this.auths.find(credentials => credentials.email === email && credentials.password === password)     
        if(!credentialFinder) {
            return {
                message: "Email o contraseña incorrectos"
            }
        }else {
            return {
                message: "Acceso exitoso"
            }
        }
    }else {
        return {
            message: "Ingresa email y/o constraseña"
        }
    }
    }

}
