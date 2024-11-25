import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class RegisterUserBodyDTO {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsOptional()
  role?: string; // 'customer', 'admin', 'staff'
}
export class UpdateUsersDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
