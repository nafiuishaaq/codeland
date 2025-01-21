import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/user.services';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    // jwt service
    private readonly jwtService: JwtService,

    // inter dependency injection of generate token provider
    private readonly generateTokenProvider: GenerateTokensProvider,

    // jwt config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // Validate the refresh token using jwtService
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );
      // Grab the user from the database
      const user = await this.userService.findOneById(sub);
      // Generate the token
      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
