/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserParamDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number;
}
