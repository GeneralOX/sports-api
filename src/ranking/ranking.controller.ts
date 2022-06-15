import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto, UpdateRankingDto } from './dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) { }

  @Post("join")
  create(@Body() dto: CreateRankingDto) {
    return this.rankingService.create(dto);
  }
  @Post("confirm")
  confirm(@Body("rankId") id: any) {
    return this.rankingService.confirmJoin(id);
  }

  @Post("block")
  block(@Body("rankId") id: any) {
    return this.rankingService.blockJoin(id);
  }

  @Get('league/:id')
  getLeagueRank(@Param('id') id: number) {
    return this.rankingService.getLeagueRank(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingService.findOne(+id);
  }
  @Post("result")
  setResult(@Body("result") data: any) {
    return this.rankingService.setResult(data);
  }

  // LATER
  @Get()
  findAll() {
    return this.rankingService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingService.update(+id, updateRankingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingService.remove(+id);
  }
}
