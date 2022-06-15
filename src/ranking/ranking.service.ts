import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRankingDto, UpdateRankingDto } from './dto';

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) { }


  async create(dto: CreateRankingDto) {
    const alreadyJoin = await this.prisma.ranking.findFirst({
      where: {
        leagueId: dto.leagueId,
        teamId: dto.teamId,
      }
    });

    if (alreadyJoin != null)
      return { alreadyJoin: true }
    await this.prisma.ranking.create({
      data: {
        league: { connect: { id: dto.leagueId, }, },
        team: { connect: { id: dto.teamId, }, },
        Rank: 0
      }
    });
    return { message: "You have been join the league!" }
  }

  async confirmJoin(id: number) {
    await this.prisma.ranking.update({
      where: { id: id },
      data: { status: 1 }
    });
    return { message: "team confirmed in the league" };
  }
  async blockJoin(id: number) {
    await this.prisma.ranking.update({
      where: { id: id },
      data: { status: 0 }
    });
    return { message: "team blocked in the league" };
  }

  async getLeagueRank(id: number) {

    const league = await this.prisma.league.findUnique({ where: { id: id }, select: { startTime: true, endTime: true, name: true } });

    const rank = await this.prisma.ranking.findMany({
      where: { leagueId: id },
      select: { id: true, team: true, Rank: true, status: true }
    });
    return { league, rank }
  }

  async findOne(id: number) {
    const rank = await this.prisma.ranking.findUnique({ where: { id: id } })
    return { rank };
  }
  async setResult(data: any) {
    await this.prisma.match.update({
      where: { id: Number(data.id) },
      data: { score: data.score }
    });
    // id, leagueId, team1Id, team2Id
    await this.prisma.ranking.updateMany({
      where: {
        teamId: data.team1Id,
        leagueId: data.leagueId
      },
      data: { Rank: { increment: Number(data.score.split(":")[0]) } }
    })
    await this.prisma.ranking.updateMany({
      where: {
        teamId: data.team2Id,
        leagueId: data.leagueId
      },
      data: { Rank: { increment: Number(data.score.split(":")[1]) } }
    })
    return { done: "yy" }
  }

  // LATER
  findAll() {
    return `This action returns all ranking`;
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
    return `This action updates a #${id} ranking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }
}
