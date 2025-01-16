/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { GetUserParamDto } from 'src/users/dto/userParam.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
// import { create } from 'domain';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmail } from './find-one-by-email';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // @Inject(CreateUserProvider)
    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByemail: FindOneByEmail,
  ) {}

  public async getAll() {
    return await this.userRepository.find();
  }

  public async findOneById(id: number) {
    // console.log(getuserparamdto)
    // console.log( this.users[0])
    return this.userRepository.findOneBy({ id });
  }

  public async createUser(createuserdto: CreateUserDto) {
    return this.createUserProvider.createUsers(createuserdto);
  }

  public async GetOneByEmail(email: string) {
    return await this.findOneByemail.FindOneByEmail(email);
  }
}
