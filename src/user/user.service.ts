import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { changeTL_Dto, CreateUser_FT_Dto, RestPss_Dto, UpdateEntre_Dto } from './dto';
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUserFromTeam(dto: CreateUser_FT_Dto) {
        console.log(dto)
        const user = this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                /* role: dto.role == "player" ? 1 : 2 */
                team: { connect: { id: dto.teamId } }
            }
        }).catch((r) => {
            console.log(r)
        }).finally(() => {
            console.log("[+] DONE");
        })
        if (!user) throw new ForbiddenException("Error while adding new player!");
        return { message: "New player added!", user };
    }

    async changeTeamLeader(dto: changeTL_Dto) {

        await this.prisma.user.updateMany({
            where: { teamId: dto.teamId, },
            data: { isLeader: 0 }
        });

        await this.prisma.user.update({
            where: { id: dto.userId },
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

    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: { id: Number(id) }
        });
        return { message: "user have been delete!" };
    }


    async upadateEntreData(userId: number, dto: UpdateEntre_Dto) {

        let data: any = {};
        data.name = dto.name;
        if (dto.password != "") {
            data.password = await argon.hash(dto.password);
        }

        const user = await this.prisma.entreprise.update({
            where: {
                id: userId
            },
            data: data
        })
        return {
            name: user.name,
            role: 0,
            team: user.teamId
        };
    }
    async getEntreData(id: number) {
        const user = await this.prisma.entreprise.findFirst({
            where: { id: id }
        })
        delete user.password;
        delete user.teamId;
        return user;
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
