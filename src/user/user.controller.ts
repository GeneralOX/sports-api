import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get(":id")
    GetUserDetails(@Param("id") id: number) {
        return this.userService.getUserDetails(id);
    }

    @Put(":id")
    UpdateUserData() {
        return this.userService.updateUserDetails({});

    }

    @Post("leader/:id")
    ChangeTeamLeader(@Param("id") id: number) {
        return this.userService.changeTeamLeader(id);

    }

}
