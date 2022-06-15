import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMatchDto {
    @IsNumber()
    @IsNotEmpty()
    leagueId: number;

    @IsNumber()
    @IsNotEmpty()
    team1Id: number;

    @IsNumber()
    @IsNotEmpty()
    team2Id: number;

    @IsNumber()
    @IsNotEmpty()
    fieldId: number;

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    startTime: string;
}
export class UpdateMatchDto { }