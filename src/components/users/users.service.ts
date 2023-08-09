import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, FindOneOptions } from 'typeorm';
import { Users as User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const { name, email } = data;
  
    // Check if user with the same name or email already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ name }, { email }],
    });
  
    if (existingUser) {
      throw new HttpException('User with the same name or email already exists', HttpStatus.BAD_REQUEST);
    }
  
    return this.usersRepository.save(data);
  }
  

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id },
    };
    return this.usersRepository.findOne(options);
  }

  async update(id:number, data: object): Promise<User | UpdateResult | undefined> {
    const user = await this.findOne(id).then(res =>res);
    if(user) return await this.usersRepository.update(id, data).then(res => res);
    return ;
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}