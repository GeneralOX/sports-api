import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFieldDto } from './dto';
@Injectable()
export class FieldService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateFieldDto) {
    await this.prisma.field.create({
      data: { name: dto.name }
    });
    return { message: 'This action adds a new field' };
  }

  async findAll() {
    const fileds = this.prisma.field.findMany();
    return { fileds };
  }

  async findOne(id: number) {
    const field = await this.prisma.field.findUnique({
      where: { id: id },
      include: { Match: true }
    })
    return `This action returns a #${id} field`;
  }

  async remove(id: number) {
    await this.prisma.field.delete({
      where: { id: id }
    });

    return { message: `This action removes a #${id} field` };
  }
}
