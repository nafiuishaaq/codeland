import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByEmail {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async FindOneByEmail(email: string) {
    let user: User | undefined;

    try {
      user = await this.usersRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error Connecting to the DataBase',
      });
    }

    if (!user) {
      throw new UnauthorizedException({
        description: 'User does not exist',
      });
    }
    return user;
  }
}
