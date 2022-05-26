import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRankingDto {
    @IsNumber()
    @IsNotEmpty()
    leagueId;

    @IsNumber()
    @IsNotEmpty()
    teamId;
}
export class UpdateRankingDto { }
