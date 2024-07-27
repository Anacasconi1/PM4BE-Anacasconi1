import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { TransformUsers } from 'src/interceptors/separatePassword';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('signin')
  create(@Body() Credentials: LoginUserDto) {
    return this.authService.SignIn(Credentials);
  }

  @HttpCode(201)
  @Post('/signup')
  @UseInterceptors(TransformUsers)
  CreateUser(@Body() UserDto: UserDto) {
    const newUserId = this.authService.createUser(UserDto);
    return newUserId;
  }
}
