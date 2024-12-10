import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PublicRouter } from 'src/decorators/public-router.decorator';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Authservices } from 'src/services/auth/auth.service';
import { Request as RequestCookie } from 'supertest';
@Controller('auth')
export class AuthController {
  constructor(private authService: Authservices) {}
  @Post('login')
  @PublicRouter()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
  @PublicRouter()
  @Get('refresh-token')
  async refreshToken(@Req() request: RequestCookie) {
    return await this.authService.handleRefreshToken(request.cookies['c_user']);
  }

  @Get('logout')
  async logOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return await this.authService.handleLogout(response);
  }
}
