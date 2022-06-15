import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) { }

  @Get()
  findAll() {
    return this.leagueService.findAll();
  }
  @Get("allData/:id")
  getLeagueData(@Param('id') id: number) {
    return this.leagueService.getLeagueData(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(+id);
  }
  @Get('matches/:id')
  getLeagueMatches(@Param('id') id: number) {
    return this.leagueService.getLeagueMatches(id);
  }
  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.remove(+id);
  }
}
