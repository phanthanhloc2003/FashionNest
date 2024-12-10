import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserBodyDTO, UpdateUsersDTO } from 'src/dto/ create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserNoPassword } from 'src/entitys/user.entity';
import { DataSource, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
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
      delete newUser.role;
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

  async delete(phone: string): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingUser = await this.findOneByPhone(phone);
      if (!existingUser) {
        throw new NotFoundException(`User with phone ${phone} not found`);
      }
      const deletedUserData = { ...existingUser };
      delete deletedUserData.passwordHash;
      delete deletedUserData.role;
      await queryRunner.manager.update(User, existingUser.id, {
        isActive: false,
        deletedAt: new Date(),
      });
      await queryRunner.commitTransaction();
      this.logger.log(`Successfully deleted user with phone: ${phone}`);
      return deletedUserData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to delete user', {
        phone,
        error: error.stack,
        timestamp: new Date().toISOString(),
      });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the user. Please try again later.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(userId: number): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        id: Not(userId),
      },
    });
  }

  async findRole(user: UserNoPassword): Promise<UserNoPassword> {
    const roleUser = await this.userRepository.findOneBy({ phone: user.phone });
    delete roleUser.passwordHash;
    return roleUser;
  }
}
