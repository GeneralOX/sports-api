import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JoinLeagueDto {
    @IsNumber()
    @IsNotEmpty()
    leagueId: string;

    @IsNumber()
    @IsNotEmpty()
    teamId: string;
}
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
