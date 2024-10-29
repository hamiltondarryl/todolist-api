import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards /jwt.guard';
import { SignupDto } from './dto/signup_dto';
import { SigninDto } from './dto/signin_dto';

@ApiTags("Authentification de l'utilisateur")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('inscription')
    @HttpCode(201)
    @ApiOperation({ summary: "Création de compte" })
   async signup(@Body() signupDto : SignupDto ) {
        return await this.authService.signup(signupDto);
    }

    @Post('connexion')
    @HttpCode(200)
    @ApiOperation({ summary: "Connexion à l'application" })
   async signin(@Body() signinDto : SigninDto) {
        return await this.authService.signIn(signinDto);
    }

}
