import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto, JoinLeagueDto, UpdateLeagueDto } from './dto';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) { }

  @Get()
  findAll() {
    return this.leagueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(+id);
  }

  @Post('join')
  joinLeague(@Body() dto: JoinLeagueDto) {
    return this.leagueService.joinLeague(dto);
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
