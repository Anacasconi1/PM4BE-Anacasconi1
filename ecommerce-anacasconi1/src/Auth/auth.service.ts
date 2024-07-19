import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor (private authRepository: AuthRepository){}
  SignIn(AuthDto: AuthDto) {
    const credentialsAuth = this.authRepository.SignInCredentials(AuthDto)
    return credentialsAuth;
  }

  // findAll() {
  //   return this.authRepository.usersCredential()
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, AuthDto: AuthDto) {
  //   console.log(AuthDto);
    
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
