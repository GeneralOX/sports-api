import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { LeagueModule } from './league/league.module';
import { FieldModule } from './field/field.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, PrismaModule, TeamModule, RankingModule, MatchModule, LeagueModule, FieldModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
