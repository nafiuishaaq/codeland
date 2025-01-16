import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
    constructor (
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>
    ) {}

    public async findMultipleTag(tags: number[]) {
        const result = this.tagRepository.find({
            where: {id: In(tags)}
        })
    }

    public async createTag(createTagDto: CreateTagDto) {
        let tag = this.tagRepository.create(createTagDto);
        return await this.tagRepository.save(tag);
    }
}
