import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode, Query, UseGuards, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  findAll (@Query('page') page?:string, @Query('limit') limit?: string, @Headers('authorization') authorization? : string) {
    if (authorization) {
      this.usersService.queryParamsLimitPage(Number(limit), Number(page))
      const users = this.usersService.findAll(Number(limit), Number(page))
      return users
    }
    return "Usuario no autorizado"
  }

  @HttpCode(201)
  @Post()
  create(@Body() UserDto: UserDto) {
    const newUserId = this.usersService.create(UserDto);
    return newUserId
  }
  
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    const userUpdatedId = this.usersService.update(Number(id), UserDto);
    return userUpdatedId
  }
  
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    const userRemovedId = this.usersService.remove(Number(id));
    return userRemovedId
  }

  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Query('page') page?:string, @Query('limit') limit?: string) {
    this.usersService.queryParamsLimitPage(Number(limit), Number(page))
    const user = this.usersService.findOneById(Number(id))
    return user
  }
}
