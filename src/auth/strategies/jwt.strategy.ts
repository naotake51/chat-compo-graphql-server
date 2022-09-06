import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Developer } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DevelopersService } from '@/developers/developers.service';

type Payload = {
  email: string;
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly developersService: DevelopersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'hogehoge',
    });
  }

  async validate(payload: Payload): Promise<Developer | null> {
    return this.developersService.findByEmail(payload.email);
  }
}