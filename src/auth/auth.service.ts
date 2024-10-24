import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';



@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ){}

    async validateUser(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
          where: { id: userId },
        });
      }

    async generateJwtToken(userId: string): Promise<string> {
        const payload = { userId };
        return this.jwtService.sign(payload);
      }
}
