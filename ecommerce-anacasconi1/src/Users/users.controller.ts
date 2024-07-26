import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  HttpCode,
  Query,
  UseGuards,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/Auth.guard';
import { User } from './entities/user.entity';
import { TransformUser, TransformUsers } from 'src/interceptors/separatePassword';
import { RolesGuard } from 'src/guards/Role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(TransformUsers)
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    try {
      const users = await this.usersService.findAll(
        Number(limit),
        Number(page),
      );
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error:
            'No es posible traer a todos los usuarios, revisa la peticion o que estes autorizado',
        },
        404,
      );
    }
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() UserDto: UserDto) {
    const userUpdatedId = this.usersService.UpdateUser(id, UserDto);
    return userUpdatedId;
  }
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const userRemovedId = this.usersService.DeleteUser(id);
    return userRemovedId;
  }
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformUser)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    const user = await this.usersService.findOneById(id);
    return user;
  }
}
