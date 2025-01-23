import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MailProvider {
  constructor(
    // INJECT THE MAILER SERVICE
    private readonly mailerService: MailerService,
  ) {}

  public async welcomeEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `helpdeskt.codeland.com`,
      subject: 'Welcome to codeland',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3002/users',
      },
    });
  }
}
