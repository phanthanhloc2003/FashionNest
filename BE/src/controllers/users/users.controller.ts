import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { PublicRouter, User } from 'src/decorators/public-router.decorator';
import { RegisterUserBodyDTO, UpdateUsersDTO } from 'src/dto/ create-user.dto';
import { UserNoPassword } from 'src/entitys/user.entity';
import { UserService } from 'src/services/users/users.service';
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
}
