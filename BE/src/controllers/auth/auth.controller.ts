import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PublicRouter, User } from 'src/decorators/public-router.decorator';
import { UserNoPassword } from 'src/entitys/user.entity';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Authservices } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: Authservices) {}
  @Post()
  @PublicRouter()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getProfile(@User() user: UserNoPassword) {
    return user;
  }
}
