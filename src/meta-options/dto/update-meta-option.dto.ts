import { PartialType } from '@nestjs/swagger';
import { CreateMetaOptionsDto } from './create-meta-option.dto';

export class UpdateMetaOptionDto extends PartialType(CreateMetaOptionsDto) {}
