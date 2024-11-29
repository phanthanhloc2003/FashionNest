import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PublicRouter, User } from 'src/decorators/public-router.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import {
  GetUserDTO,
  RegisterUserBodyDTO,
  UpdateUsersDTO,
} from 'src/dto/ create-user.dto';
import { User as users, UserNoPassword } from 'src/entitys/user.entity';
import { RolesGuard } from 'src/guard/roles.guard';
import { UserService } from 'src/services/users/users.service';
import { Role } from 'src/types/role.enum';
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  @PublicRouter()
  @Post('register')
  async register(@Body() body: RegisterUserBodyDTO): Promise<UserNoPassword> {
    return this.usersService.create(body);
  }

  @Get('user-information')
  async getUser(@User() user: UserNoPassword): Promise<UserNoPassword> {
    const users = await this.usersService.findOneByPhone(user.phone);
    delete users.passwordHash;
    return users;
  }

  @Put('user-update')
  async userUpdate(
    @User() user: UserNoPassword,
    @Body() body: UpdateUsersDTO,
  ): Promise<string> {
    return this.usersService.updateUser(user, body);
  }

  @Delete('user-delete/:phone')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async userDelete(@Param() param: GetUserDTO) {
    return await this.usersService.delete(param.phone);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getAllUsers(): Promise<users[]> {
    return await this.usersService.findAll();
  }

  @Get('role')
  async getRole(@User() user: UserNoPassword): Promise<UserNoPassword> {
    return await this.usersService.findRole(user);
  }
}
