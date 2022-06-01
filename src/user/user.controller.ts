import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { changeTL_Dto, CreateUser_FT_Dto, RestPss_Dto, UpdateEntre_Dto } from './dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("link/rest")
    restUserPassword(@Body() dto: RestPss_Dto) {
        return this.userService.restUserPassword(dto);
    }

    @Post("add")
    createUserFromTeam(@Body() dto: CreateUser_FT_Dto) {
        return this.userService.createUserFromTeam(dto);
    }

    @Get("user/:id")
    GetUserDetails(@Param("id") id: number) {
        return this.userService.getUserDetails(id);
    }

    @Put("leader/change")
    ChangeTeamLeader(@Body() dto: changeTL_Dto) {
        return this.userService.changeTeamLeader(dto);
    }

    @Delete(":id")
    DeleteUser(@Param("id") id: number) {
        return this.userService.deleteUser(id);
    }

    // UPDATE USER DATA
    @Patch("entreprise")
    upadateEntreData(@Body() dto: UpdateEntre_Dto, @Req() req: Request) {
        let user: any = req.user;
        return this.userService.upadateEntreData(user.id, dto);
    }
    @Get("entreprise")
    GetEntreData(@Req() req: Request) {
        let user: any = req.user;
        return this.userService.getEntreData(user.id);
    }


    @Patch("user")
    updateUserDate() {

    }
}
