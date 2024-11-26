import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserService } from 'src/services/users/users.service';
import { Role } from 'src/types/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const users = await this.userService.findOneByPhone(user.phone);
    if (!users) {
      throw new NotFoundException(`User with phone ${user.phone} not found`);
    }

    return requiredRoles.some((role) => users.role?.includes(role));
  }
}
