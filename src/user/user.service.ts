import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUserDetails(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            }
        });
        if (!user) throw new ForbiddenException("Incorrect user ID!");
        return user;
    }

    async updateUserDetails(dto: any) {
        //
        return {};
    }

    async changeTeamLeader(id: number) {
        return {};
    }
}
