import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  
  SignIn(Credentials: LoginUserDto) {
    const credentialsAuth = this.userRepository.findOne({where: {
      email: Credentials.email,
      password: Credentials.password
    }})
    if(credentialsAuth){
      return {message: "Credenciales correctas"}
    }else{
      return {message: "Ingresa las credenciales correctas"}
    }
  }
  
}
