import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Developer } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Developer> {
    const developer = await this.authService.validate(email, password);
    if (!developer) {
      throw new UnauthorizedException();
    }

    return developer;
  }
}
