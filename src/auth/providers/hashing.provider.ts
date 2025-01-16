import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  // hashing
  abstract hashPassword(data: string | Buffer): Promise<string>;

  // comparing
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
