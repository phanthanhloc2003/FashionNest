import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserBodyDTO, UpdateUsersDTO } from 'src/dto/ create-user.dto';
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

  async updateUser(
    user: UserNoPassword,
    param: UpdateUsersDTO,
  ): Promise<string> {
    try {
      const { phone } = param;
      const existingUser = await this.findOneByPhone(user.phone);
      if (!existingUser) {
        throw new NotFoundException(`User with phone ${user.phone} not found`);
      }

      const ischeckphone = await this.findOneByPhone(phone);
      if (ischeckphone) {
        throw new ConflictException(
          `Phone number ${phone} already exists, please enter another phone number`,
        );
      }
      const userUpdate = await this.userRepository.update(
        { phone: user.phone },
        param,
      );
      if (userUpdate.affected === 0) {
        throw new NotFoundException(`User with phone ${user.phone} not found`);
      }
      return 'succsess';
    } catch (error) {
      this.logger.error('Error updating user', {
        error: error.stack,
        phone: user.phone,
      });
      throw error;
    }
  }
}
