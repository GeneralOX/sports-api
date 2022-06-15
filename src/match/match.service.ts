import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatchDto, UpdateMatchDto } from './dto';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const matches = this.prisma.match.findMany({
      where: {},
      select: {
        startAt: true, id: true, score: true,
        team1: true, team2: true, league: true, field: true
      }
    })
    return matches;
  }

  async findOne(id: number) {
    const match = await this.prisma.match.findUnique({
      where: { id: id },
      select: {
        startAt: true, id: true, score: true,
        team1: { select: { name: true, id: true } },
        team2: { select: { name: true, id: true } },
        league: true, field: true
      }
    })
    return match;
  }

  async remove(id: number) {
    await this.prisma.match.delete({
      where: { id: id }
    })
    return { message: `This action removes a #${id} match` };
  }

  async create(dto: CreateMatchDto) {
    const data = await this.prisma.match.create({
      data: {
        score: "pending",
        fieldId: Number(dto.fieldId),
        leagueId: Number(dto.leagueId),
        team1Id: Number(dto.team1Id),
        team2Id: Number(dto.team2Id),
        startDate: dto.startDate,
        startTime: dto.startTime,
        startAt: new Date(dto.startDate + "T" + dto.startTime),
      }
    })
    return data;
  }
  // LATER


  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }
}
