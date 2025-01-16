import { PostStatus } from "src/post/enums/postStatus.enum";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { IsArray, IsDate, IsEnum,  IsInt,  IsISO8601,  isISO8601,  IsNotEmpty,  IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { PostType } from "src/post/enums/postType.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateMetaOptionsDto } from "src/meta-options/dto/create-meta-option.dto";
import { JoinColumn, OneToOne } from "typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { Tag } from "src/tag/tag.entity";

export class CreatePostDto {
    @IsOptional()
    @IsObject()
    author: CreateUserDto

    @IsNotEmpty()
    @IsInt()
    authorId: number;

    
    @ApiProperty({
        example: "Title of post must be minimum of 4 chars and a string"
    })
    @IsString()
    @MinLength(4)
    title: string;

    @ApiProperty({
        enum: PostType,
        description: 'Accepted values are either story, reviewed, draft and published'
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        enum: PostStatus,
        description: 'Values are drafts, scheduled, reviewed, published'
    })
    @IsEnum(PostStatus)
    @IsOptional()
    postStatus: PostStatus;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsDate()
    @IsOptional()
    @IsISO8601()
    publishedDate: Date;

    @ApiProperty({
        description: 'Published date'
    })
    @IsArray()
    @IsOptional()
    @IsInt({each: true})
    tags: number[];

    
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateMetaOptionsDto)
    metaOptions?: CreateMetaOptionsDto | null;

    

    // @ApiPropertyOptional({
    //     type: 'array',
    //     required: false,
    //     items: {
    //       type: 'object',
    //       properties: {
    //         metaValue: {
    //           type: 'json',
    //           description:
    //             'The key can be any string identifier for your meta option',
    //           example: 'sidebarEnabled',
    //         },
    //         value: {
    //           type: 'any',
    //           description: 'Any value that you want to save to the key',
    //           example: true,
    //         },
    //       },
    //     },
    //   })
}