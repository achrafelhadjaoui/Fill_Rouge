import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsPhoneNumber('MA', { message: 'Phone number is invalid' })
  phone_number: string;


  @IsArray()
  @IsOptional()
  @ArrayNotEmpty({ message: 'Payment methods should not be empty if provided' })
  payment_methods?: string[];
}
