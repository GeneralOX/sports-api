import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUser_FL_Dto, SignUpDto, SingInDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    SignUp(@Body() dto: SignUpDto) {
        return this.authService.EntrepriseSignUp(dto);
    }

    @Post("entreprise")
    Signin(@Body() dto: SingInDto) {
        return this.authService.EntrepriseSignIn(dto);
    }

    @Post("player")
    SigninPlayer(@Body() dto: SingInDto) {
        return this.authService.PlayerSignIn(dto)
    }

    @Post("admin")
    SigninAdmin(@Body() dto: SingInDto) {
        return this.authService.SigninAdmin(dto)
    }
    @Post("register-admin")
    SignupAdmin(@Body() dto: SingInDto) {
        return this.authService.SignupAdmin(dto)
    }

    @Post("link-register")
    createUserFromLink(@Body() dto: CreateUser_FL_Dto) {
        return this.authService.createUserFromLink(dto);
    }
}