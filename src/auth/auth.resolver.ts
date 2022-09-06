import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '@/auth/auth.service';
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard';
import { LoginResponse } from '@/auth/models/login-response';
import { LoginInput } from '@/auth/models/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    return this.authService.login(context.user);
  }
}
