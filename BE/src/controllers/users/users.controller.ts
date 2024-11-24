import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserBodyDTO } from 'src/dto/ create-user.dto';
import { UserNoPassword } from 'src/entitys/user.entity';
import { UserService } from 'src/services/users/users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Post()
  async register(@Body() body: RegisterUserBodyDTO): Promise<UserNoPassword> {
    return this.usersService.create(body);
  }
}
