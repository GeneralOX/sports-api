import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto, SingInDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("signup")
    SignUp(@Body() dto: SignUpDto) {
        return this.authService.EntrepriseSignUp(dto);
    }
    @Post("/entreprise/signin")
    Signin(@Body() dto: SingInDto) {
        return this.authService.EntrepriseSignIn(dto);
    }
    @Post("/player/signin")
    SigninPlayer(@Body() dto: SingInDto) {
        return this.authService.PlayerSignIn(dto)
    }

}