import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './meta-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
