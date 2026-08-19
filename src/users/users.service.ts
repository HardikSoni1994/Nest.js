import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Hardik Soni', email: 'hardik@gmail.com' },
    { id: 2, name: 'raj parmar', email: 'raj@gmail.com' },
  ];

  // loggerService injected into userService
  constructor(private readonly logger: LoggerService) {}

  // CREAT
  create(CreateUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...CreateUserDto,
    };
    this.users.push(newUser);
    this.logger.log(`User Created: ${newUser.name}`);
    return newUser;
  }

  // READ ALL
  findAll(name?: string): User[] {
    this.logger.log('Fetching All Users');
    if (name) {
      return this.users.filter((u) =>
        u.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    return this.users;
  }

  // READ ONE
  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`Fetched User: ${user.name}`);
    return user;
  }

  // UPDATE
  update(id: number, UpdateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);

    Object.assign(user, UpdateUserDto); // merge updated fields
    this.logger.log(`User updated: ${user.name}`);
    return user;
  }

  // DELETE
  remove(id: number): void {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      this.logger.error(`User with ID ${id} not found or Deletion`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.slice(index, 1);
    this.logger.log(`User with ID ${id} deleted`);
  }
}
