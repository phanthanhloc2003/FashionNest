import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserNoPassword } from 'src/entitys/user.entity';

@Injectable()
export class Authservices {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const user = await this.userService.findOneByPhone(username);
      if (user && bcrypt.compareSync(pass, user?.passwordHash)) {
        const result = { ...user };
        delete result.passwordHash;
        return result;
      }
      throw new HttpException(
        'Phone number or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async login(user: UserNoPassword) {
    const payload = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
