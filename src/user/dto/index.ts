import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUser_FT_Dto {
    @IsNumber()
    @IsNotEmpty()
    teamId: number;


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class changeTL_Dto {

    @IsNumber()
    @IsNotEmpty()
    teamId: number;

    @IsNumber()
    @IsNotEmpty()
    userid: number;

}

export class RestPss_Dto {
    @IsNumber()
    @IsNotEmpty()
    userid: number;

    @IsString()
    @IsNotEmpty()
    password: string;
}