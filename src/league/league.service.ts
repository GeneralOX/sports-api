import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

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
  // LATER
  create(createLeagueDto: CreateLeagueDto) {
    return 'This action adds a new league';
  }




  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return `This action updates a #${id} league`;
  }

  remove(id: number) {
    return `This action removes a #${id} league`;
  }
}
