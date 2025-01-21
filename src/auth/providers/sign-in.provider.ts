import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from '../dto/signIn.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    // intra dependency injection of hash provider
    private readonly hashingProvider: HashingProvider,

    // inter dependency injection of generate token provider
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    // find user by email
    const user = await this.userService.GetOneByEmail(signInDto.email);
    // throw error if the user is not available
    // compare the passsword
    let IsEqual: boolean = false;
    try {
      IsEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error connecting to the database',
      });
    }

    if (!IsEqual) {
      throw new UnauthorizedException('wrong email or password combination.');
    }

    const tokens = await this.generateTokenProvider.generateTokens(user);
    return [tokens, user];
  }
}
