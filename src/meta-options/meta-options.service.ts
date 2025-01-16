import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "./meta-option.entity";
import { CreateMetaOptionsDto } from "./dto/create-meta-option.dto";
import { Repository } from "typeorm";

@Injectable()
export class MetaOptionsService {
    constructor (
        @InjectRepository(MetaOption)
        private readonly metaRepository: Repository <MetaOption>
    ) {}

    public async createMeta(createMetaOptionsDto: CreateMetaOptionsDto) {
        const metaOptions = await this.metaRepository.create(createMetaOptionsDto)
        return this.metaRepository.save(metaOptions)
    }
}