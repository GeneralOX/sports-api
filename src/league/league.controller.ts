import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

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

  // LATER

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leagueService.update(+id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.remove(+id);
  }
}
