import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
    constructor (private readonly tagService: TagService) {}

    @Post()
    public createTag(@Body() createTagDto: CreateTagDto) {
        return this.tagService.createTag(createTagDto)
    }
}
