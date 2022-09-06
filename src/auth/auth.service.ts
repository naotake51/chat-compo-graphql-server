import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Developer } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DevelopersService } from '@/developers/developers.service';

@Injectable()
export class AuthService {
  constructor(
    private developersService: DevelopersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Developer | null> {
    const developer = await this.developersService.findByEmail(email);
    if (
      developer &&
      bcrypt.compareSync(password, developer.encryptedPassword)
    ) {
      return developer;
    }

    return null;
  }

  async login(developer: Developer) {
    const payload = { email: developer.email, sub: developer.id };

    return {
      accessToken: this.jwtService.sign(payload),
      developer,
    };
  }
}
