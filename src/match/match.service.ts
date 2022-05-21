import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const matches = this.prisma.match.findMany({
      where: {},
      select: {
        startAt: true, id: true,
        team1: true, team2: true, league: true, field: true
      }
    })
    return matches;
  }

  findOne(id: number) {
    const match = this.prisma.match.findUnique({
      where: { id: id },
      select: {
        startAt: true, id: true, score: true,
        team1: { select: { name: true, players: { select: { id: true, name: true, position: true } } } },
        team2: { select: { name: true, players: { select: { id: true, name: true, position: true } } } },
        league: true, field: true
      }
    })
    return match;
  }

  // LATER
  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
