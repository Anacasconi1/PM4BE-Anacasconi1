import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    password: string
}
