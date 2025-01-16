import { ApiProperty } from '@nestjs/swagger';
import {  PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreatePostDto } from './createPost.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}