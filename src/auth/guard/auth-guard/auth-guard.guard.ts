import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { enumsTypes } from 'src/auth/enums/auth-type-enums';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  private static readonly defaultOfType: enumsTypes.Bearer;
  private readonly authTypeGuardMap: Record<
    enumsTypes,
    CanActivate | CanActivate[]
  > = {
    [enumsTypes.Bearer]: this.accessTokenGuard,
    [enumsTypes.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
