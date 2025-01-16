import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';
import { MetaOptionsService } from './meta-options.service';
import { CreateMetaOptionsDto } from './dto/create-meta-option.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor (private readonly metaOptionService: MetaOptionsService) {}

  @Post()
  public createMetaOptions(
    @Body() createPostMetaOptionsDto: CreateMetaOptionsDto
  ) {
    return this.metaOptionService.createMeta(createPostMetaOptionsDto)
  }
}
