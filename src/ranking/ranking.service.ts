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
