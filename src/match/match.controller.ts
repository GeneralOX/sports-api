import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto, UpdateMatchDto } from './dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }


  // LATER
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }


}
