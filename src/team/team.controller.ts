import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto, @Req() req: Request) {
    let user: any = req.user;
    return this.teamService.create(user.id, createTeamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teamService.remove(+id);
  }


  // LATER
  @Get()
  findAll() {
    return this.teamService.findAll();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }


}
