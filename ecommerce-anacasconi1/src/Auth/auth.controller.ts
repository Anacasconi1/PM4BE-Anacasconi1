import { Controller,  Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  create(@Body() AuthDto: AuthDto) {
    return this.authService.SignIn(AuthDto);
  }

  // @Get()
  // findAll( ) {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() AuthDto: AuthDto) {
  //   return this.authService.update(+id, AuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
