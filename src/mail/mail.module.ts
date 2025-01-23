import { Global, Module } from '@nestjs/common';
import { MailProvider } from './providers/mail.provider';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          port: config.get('MAIL_PORT'),
          auth: {
            user: config.get('SMTP_USERNAME'),
            password: config.get('SMTP_PASSWORD'),
          },
        },

        defaults: {
          from: `no-reply<helpdesk@codeland.com>`,
        },

        template: {
          dir: join(__dirname, 'template'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailProvider],
  exports: [MailProvider],
})
export class MailModule {}
