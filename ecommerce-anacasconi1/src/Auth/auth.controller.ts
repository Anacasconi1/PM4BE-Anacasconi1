import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from 'src/users/dto/user.dto';


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
  CreateUser(@Body() UserDto: UserDto) {
    const newUserId = this.authService.createUser(UserDto);
    return newUserId;
  }
}
