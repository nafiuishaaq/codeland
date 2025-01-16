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
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    // intra dependency injection of hash provider
    private readonly hashingProvider: HashingProvider,

    // jwt service
    private readonly jwtService: JwtService,

    // jwt config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

    // send confirmation message
    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.ttl,
      },
    );

    return { access_token };
  }
}
