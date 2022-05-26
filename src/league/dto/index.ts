import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLeagueDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;
}
export class UpdateLeagueDto {

}
