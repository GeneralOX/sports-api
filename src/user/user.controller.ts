import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { changeTL_Dto, CreateUser_FT_Dto, RestPss_Dto } from './dto';
import { UserService } from './user.service';

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

    @Get(":id")
    GetUserDetails(@Param("id") id: number) {
        return this.userService.getUserDetails(id);
    }

    @Put("leader/change")
    ChangeTeamLeader(@Body() dto: changeTL_Dto) {
        return this.userService.changeTeamLeader(dto);
    }

}
