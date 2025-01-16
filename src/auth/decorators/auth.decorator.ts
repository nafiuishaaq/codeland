import { AUTH_TYPE_KEY } from '../constant/auth-constant';
import { enumsTypes } from '../enums/auth-type-enums';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: enumsTypes[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

// export const Auth = (...args: string[]) => SetMetadata('auth', args);
