import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { changeTL_Dto, CreateUser_FT_Dto, RestPss_Dto } from './dto';
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUserFromTeam(dto: CreateUser_FT_Dto) {
        const user = this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                teamId: dto.teamId,
            }
        })
        if (!user) throw new ForbiddenException("Error while adding new player!");
        return { message: "New player added!" };
    }

    async changeTeamLeader(dto: changeTL_Dto) {

        await this.prisma.user.updateMany({
            where: { teamId: dto.teamId, },
            data: { isLeader: 0 }
        });

        await this.prisma.user.update({
            where: { id: dto.userid },
            data: { isLeader: 1 }
        })
        return { message: "team leader have been changed!" };
    }

    async restUserPassword(dto: RestPss_Dto) {
        const hash = await argon.hash(dto.password);
        await this.prisma.user.update({
            where: { id: dto.userid },
            data: { password: hash }
        })
        return { message: "password changed!" };
    }


    // LATER
    async getUserDetails(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            }
        });
        if (!user) throw new ForbiddenException("Incorrect user ID!");
        delete user.password;
        return user;
    }
}
