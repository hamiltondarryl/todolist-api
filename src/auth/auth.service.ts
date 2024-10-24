import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from './dto/signup_dto';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin_dto';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    // Method to create a new user
    async signup(signupDto: SignupDto): Promise<{ accessToken: string; user: User }> {

        const { nom, email, password } = signupDto;
        const existingUser = await this.prismaService.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                nom,
                email,
                password: hashedPassword,
            },
        });

        const accessToken = await this.generateJwtToken(user.id);

        return { accessToken, user };
    }

    // Method to sign in a user
    async signIn(signinDto: SigninDto) : Promise<{ accessToken: string; user: User }>  {

        const { email, password } = signinDto;
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const accessToken = await this.generateJwtToken(user.id);

        return { accessToken, user };

    }

    // Method to validate a user
    async validateUser(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: { id: userId },
        });
    }

    // Method to generate a JWT token
    async generateJwtToken(userId: string): Promise<string> {
        const payload = { userId };
        return this.jwtService.sign(payload);
    }
}


