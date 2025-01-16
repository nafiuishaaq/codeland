/* eslint-disable prettier/prettier */
import {
    IsEmail,
    IsOptional,
    IsString,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(225)
    @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z\d])[a-zA-Z\d!@#$%^&*]{6,}$/, {
        message: "Invalid Password"
    })
    password: string;
}