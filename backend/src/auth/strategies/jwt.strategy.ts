import { ConfigService} from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( configService : ConfigService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret')
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Ensure this matches the payload structure
  }
  
}