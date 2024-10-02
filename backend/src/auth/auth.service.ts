import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log("validation")
    // Find user by email
    const user = await this.usersRepository.findOneBy({email});

    // Check if user exists and compare passwords
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // Return the entire user object
    } else {
      return null
    }
  }

  // Create a new user
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phone_number, payment_methods } = createUserDto;

    // check if the user is exist
    const isExist = await this.usersRepository.findOneBy({ email });
    if (isExist) {
      throw new ConflictException('User already exists with this email')
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      payment_methods
    });

    return this.usersRepository.save(newUser);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }; // Use email and user ID
    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user, password: undefined }, // Return user without password
    };
  }
  



}
