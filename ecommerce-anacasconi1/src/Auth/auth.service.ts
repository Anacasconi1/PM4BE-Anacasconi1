import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import * as Bcypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly JwtService: JwtService
  ){}
  
  async SignIn(Credentials: LoginUserDto) {
    const credentialsAuth = await this.userRepository.findOne({where: {
      email: Credentials.email,
    }})
    const PasswordCompare = Bcypt.compare(Credentials.password, credentialsAuth.password)
    if(credentialsAuth){
      if(PasswordCompare){
        const userPayload = {
          sub: credentialsAuth.id,
          id: credentialsAuth.id,
          email: credentialsAuth.email,
          roles: [credentialsAuth.isAdmin? Role.Admin : Role.User]
        }
        const token = this.JwtService.sign(userPayload)
        return {message: 'Inicio de sesion exitoso', token}
      }else{
        throw new BadRequestException('Credenciales incorrectas')
      }
    }else{
      throw new BadRequestException('Credenciales incorrectas')
    }
  }

  async createUser(UserDto: UserDto) {
    const IsAUserWithEmail = await this.userRepository.findOne({where: {
      email: UserDto.email
    }})
    if(!IsAUserWithEmail){
      if(UserDto.password === UserDto.passwordConfirm) {
        const EncryptedPassword = await Bcypt.hash(UserDto.password, 10)
        console.log(EncryptedPassword);
        const newUser = await this.userRepository.save({...UserDto, password: EncryptedPassword})
        return {message: "Usuario creado con exito", 
          newUser
        }
      }else{
        throw new BadRequestException('Las contraseñas provistas no coinciden')
      }
    }else {
      throw new BadRequestException('El email provisto ya está registrado')
    }
  }
  
}
