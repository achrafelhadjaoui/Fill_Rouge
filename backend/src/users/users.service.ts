import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';  // Assume you have a DTO for user creation
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  // Find a user by email
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  // Find a user by their ID
  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  // Update a user (e.g., update email or password)
  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  // Delete a user by their ID
  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
