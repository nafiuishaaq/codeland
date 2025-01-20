import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    // jwt service
    private readonly jwtService: JwtService,

    // jwt config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        email: payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [access_token, refresh_token] = await Promise.all([
      // generate acess token
      this.signToken(user.id, this.jwtConfiguration.ttl, { email: user.email }),
      // generate refresh token
      this.signToken(user.id, this.jwtConfiguration.rttl),
    ]);

    return { access_token, refresh_token };
  }
}
