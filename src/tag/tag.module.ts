import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService, TypeOrmModule] // Why are we exporting typeorm module
})
export class TagModule {}
