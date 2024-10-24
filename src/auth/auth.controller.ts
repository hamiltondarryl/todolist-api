import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards /local.guard';
import { JwtAuthGuard } from './guards /jwt.guard';
import { SignupDto } from './dto/signup_dto';
import { SigninDto } from './dto/signin_dto';

@ApiTags("Authentification de l'utilisateur")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('inscription')
    @ApiOperation({ summary: "Création de compte" })
    signup(@Body() signupDto : SignupDto ) {
        return 'ok';
    }

    @Post('connexion')
    @ApiOperation({ summary: "Connexion à l'application" })
    @UseGuards(LocalGuard)
    signin(@Body() signupDto : SigninDto) {
        return 'ok';
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        
        return "ok";
    }

}
