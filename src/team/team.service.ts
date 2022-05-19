import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTeamDto) {
    await this.prisma.team.create({
      data: {
        name: dto.name
      }
    });
    return { message: "new team added" };
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id: id },
      include: {
        players: true,
      }
    });
    if (!team) throw new ForbiddenException("Error!");

    return team;
  }

  findAll() {
    return [];
  }


  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}