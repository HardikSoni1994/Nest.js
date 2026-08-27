import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);
    this.logger.log(`User created: ${saved.name}`);
    return saved;
  }

  async findAll(name?: string): Promise<User[]> {
    this.logger.log('Fetching all users');
    if (name) {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('LOWER(user.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
        .getMany();
    }
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`Fetched user: ${user.name}`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    this.logger.log(`User updated: ${user.name}`);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    this.logger.log(`User with ID ${id} deleted`);
    return { message: `User with ID ${id} deleted successfully` };
  }

  async assignRole(userId: number, roleId: number): Promise<User> {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: { roles: true },
  });
  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }
  const role = await this.roleRepository.findOne({ where: { id: roleId } });
  if (!role) {
    throw new NotFoundException(`Role with ID ${roleId} not found`);
  }
  user.roles = [...user.roles, role];
  return await this.userRepository.save(user);
}
}