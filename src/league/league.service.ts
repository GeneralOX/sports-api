import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeagueDto } from './dto';

@Injectable()
export class LeagueService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const leagues = await this.prisma.league.findMany({
      where: {
        endTime: {
          gte: new Date()
        }
      }
    });

    return leagues;
  }

  async findOne(id: number) {
    var league: any = await this.prisma.league.findUnique({
      where: { id: id },
      include: { Match: true },
    });
    var teamsId = [];
    league.Match.forEach(
      (e) => {
        if (!teamsId.includes(e.team1Id))
          teamsId.push(e.team1Id)
        if (!teamsId.includes(e.team2Id))
          teamsId.push(e.team2Id)
      });
    var teams = await this.prisma.team.findMany({
      where: {
        id: {
          in: teamsId
        }
      }
    });
    return { league, teams };
  }

  async create(dto: CreateLeagueDto) {
    await this.prisma.league.create({
      data: {
        name: dto.name,
        startTime: dto.startTime,
        endTime: dto.endTime,
      }
    });
    return { message: "New League have been added" };
  }

  async remove(id: number) {
    await this.prisma.league.delete({
      where: { id: id }
    })
    return { message: "League have been removed" };
  }

}
