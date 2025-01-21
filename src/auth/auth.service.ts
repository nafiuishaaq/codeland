import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from './dto/signIn.dto';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly refreshTokenProvider: RefreshTokenProvider,

    // intra dependency injection of signin provider
    private readonly signInProvider: SignInProvider,
  ) {}

  public async SignIn(signinDto: SignInDto) {
    return await this.signInProvider.SignIn(signinDto);
  }

  public async RefreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
