import { Inject, Injectable, Logger } from '@nestjs/common';
import { RegisterUserBodyDTO } from 'src/dto/ create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserNoPassword } from 'src/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(param: RegisterUserBodyDTO): Promise<UserNoPassword> {
    try {
      const { phone, fullName, password } = param;
      const ischeckphone = await this.findOneByPhone(phone);
      if (ischeckphone) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        phone: phone,
        fullName: fullName,
        passwordHash: hashedPassword,
      });
      const newUser = await this.userRepository.save(user);
      delete newUser.passwordHash;
      return newUser;
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw error;
    }
  }
  async findOneByPhone(phone: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { phone: phone },
      });
    } catch (error) {
      this.logger.error('Error finding user by phone', error.stack);
      throw error;
    }
  }
}
