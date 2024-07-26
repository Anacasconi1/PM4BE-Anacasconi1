import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches} from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @Length(3, 80)
    name: string;
    
    @IsEmail()
    email: string;

    @IsEmpty()
    isAdmin: boolean

    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    password: string;

    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    passwordConfirm: string;

    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsString()
    @IsOptional()
    @Length(5, 20)
    country?: string | undefined;
    
    @IsString()
    @IsOptional()
    @Length(5, 20)
    city?: string | undefined;
}
