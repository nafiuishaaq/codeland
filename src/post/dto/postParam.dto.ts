/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetPostParamDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: string;
}
