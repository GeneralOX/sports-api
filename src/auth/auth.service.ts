import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";

import { CreateUser_FL_Dto, SignUpDto, SingInDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async EntrepriseSignUp(dto: SignUpDto) {
        const hash = await argon.hash(dto.password);
        try {
            const entrp = await this.prisma.entreprise.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    password: hash
                }
            });
            return this.signToken(entrp.id, entrp.email);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002')
                    throw new ForbiddenException("Email allready used!");
            }
        }
    }

    async EntrepriseSignIn(dto: SingInDto) {
        const user = await this.prisma.entreprise.findUnique({
            where: {
                email: dto.email,
            }
        });
        if (!user) throw new ForbiddenException("Incorrect Email!");
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException("Incorrect Password!");
        return this.signToken(user.id, user.email);
    }

    async PlayerSignIn(dto: SingInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        if (!user) throw new ForbiddenException("Incorrect Email!");
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException("Incorrect Password!");
        return this.signToken(user.id, user.email);
    }

    async createUserFromLink(dto: CreateUser_FL_Dto) {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.update({
            where: { id: dto.id },
            data: {
                age: dto.age,
                password: hash,
                phone: dto.phone,
                position: dto.position,
            }
        })
        if (!user) throw new ForbiddenException("Connot create new user!");
        return { message: "register ok!" };
    }

    
    async signToken(useid: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: useid,
            email
        }

        const token = await this.jwt.signAsync(payload, { expiresIn: '120m', secret: this.config.get('JWT_SECRET') });
        return {
            access_token: token
        }
    }
}