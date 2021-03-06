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
    if (league != null)
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
    const league = await this.prisma.league.create({
      data: {
        name: dto.name,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      }
    });
    return league;
  }

  async remove(id: number) {
    await this.prisma.league.delete({
      where: { id: id }
    })
    return { message: "League have been removed" };
  }

  async getLeagueMatches(id: number) {
    const matches = await this.prisma.match.findMany({
      where: { leagueId: Number(id) },
      select: {
        startAt: true, id: true, score: true,
        team1: true, team2: true, league: true, field: true
      }
    })
    return matches;
  }

  async getLeagueData(id: number) {
    var league: any = await this.prisma.league.findUnique({
      where: { id: Number(id) },
      include: { Match: true },
    });
    let rank = await this.prisma.ranking.findMany({
      where: { leagueId: Number(id) },
      select: { team: true }
    });
    let teams = rank.map((c) => c.team);
    let matches = await this.getLeagueMatches(Number(id));
    return { league, teams, matches };
  }
}
