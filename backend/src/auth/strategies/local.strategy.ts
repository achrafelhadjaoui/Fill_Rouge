import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log("locaaaaaaaaaaaaaaaaaaal")
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // it is like a midlle ware so the user it will be aviallabale in the comming process
    return user;
  }
}